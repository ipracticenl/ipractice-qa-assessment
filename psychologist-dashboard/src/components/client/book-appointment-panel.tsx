import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { format } from "date-fns";
import type { FC } from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { AvailableTimeSlot, PsychologistSummaryDto } from "@/types";
import { Select } from "../select";

interface BookAppointmentPanelProps {
  psychologists: PsychologistSummaryDto[];
  availableSlots: AvailableTimeSlot[];
  showBooking: boolean;
  setShowBooking: (showBooking: boolean) => void;
  selectedPsychologistId: number | null;
  setSelectedPsychologist: (psychologistId: number) => void;
  resetBookingFlow: () => void;
  handleBookAppointment: (slotId: string, comment?: string) => void;
}

export const BookAppointmentPanel: FC<BookAppointmentPanelProps> = ({
  psychologists,
  availableSlots,
  showBooking,
  selectedPsychologistId,
  setSelectedPsychologist,
  setShowBooking,
  resetBookingFlow,
  handleBookAppointment,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<AvailableTimeSlot | null>(
    null
  );
  const [comment, setComment] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const handleSlotClick = (slot: AvailableTimeSlot) => {
    setSelectedSlot(slot);
    setShowCommentDialog(true);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      handleBookAppointment(selectedSlot.id, comment.trim() || undefined);
      setComment("");
      setSelectedSlot(null);
      setShowCommentDialog(false);
    }
  };

  const handleCancelBooking = () => {
    setComment("");
    setSelectedSlot(null);
    setShowCommentDialog(false);
  };
  return (
    <Card data-testid="book-appointment-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book New Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showBooking ? (
          <div>
            <label
              htmlFor="psychologist-selector"
              className="block text-sm font-medium mb-2"
            >
              Select Psychologist
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                id="psychologist-selector"
                defaultValue={selectedPsychologistId}
                onChange={setSelectedPsychologist}
                className="w-full p-3 border rounded-md mb-4 min-h-[44px] touch-manipulation"
                data-testid="psychologist-selector"
                aria-describedby="psychologist-selector-help"
                options={psychologists}
                placeholder={"Choose a psychologist"}
              />
              <div id="psychologist-selector-help" className="sr-only">
                Select a psychologist to view their available appointment times
              </div>

              <Button
                onClick={() => setShowBooking(true)}
                disabled={!selectedPsychologistId}
                className="w-full min-h-[44px] touch-manipulation"
                data-testid="view-available-times-button"
                aria-describedby="view-times-help"
              >
                View Available Times
              </Button>
            </div>
            <div id="view-times-help" className="sr-only">
              View available appointment times for the selected psychologist
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="font-medium text-lg">
                Available times for{" "}
                {
                  psychologists.find((p) => p.id === selectedPsychologistId)
                    ?.name
                }
              </h3>
              <Button
                onClick={resetBookingFlow}
                variant="outline"
                size="sm"
                className="min-h-[36px] touch-manipulation bg-transparent"
                data-testid="back-to-psychologist-selection"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>

            <div
              className="space-y-2 max-h-80 overflow-y-auto"
              data-testid="available-slots-list"
            >
              {availableSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No available time slots</p>
                  <p className="text-sm">
                    Please check back later or select a different psychologist
                  </p>
                </div>
              ) : (
                availableSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md hover:bg-gray-50 gap-2"
                    data-testid={`available-slot-${slot.id}`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        {format(slot.from, "EEEE, MM/dd/yyyy")}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(slot.from, "HH:mm")} -{" "}
                        {format(slot.to, "HH:mm")}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSlotClick(slot)}
                      className="min-h-[36px] touch-manipulation w-full sm:w-auto"
                      data-testid={`book-slot-${slot.id}`}
                      aria-label={`Book appointment on ${format(
                        slot.from,
                        "EEEE, MM/dd/yyyy"
                      )} at ${format(slot.from, "HH:mm")}`}
                    >
                      Book
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSlot && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">
                  {format(selectedSlot.from, "EEEE, MM/dd/yyyy")}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(selectedSlot.from, "HH:mm")} -{" "}
                  {format(selectedSlot.to, "HH:mm")}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  with{" "}
                  {
                    psychologists.find((p) => p.id === selectedPsychologistId)
                      ?.name
                  }
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Additional Comments (Optional)
              </label>
              <Textarea
                id="comment"
                placeholder="Add any additional information or requests for this appointment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] resize-none"
                data-testid="appointment-comment"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelBooking}
              data-testid="cancel-booking"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              data-testid="confirm-booking"
            >
              Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
