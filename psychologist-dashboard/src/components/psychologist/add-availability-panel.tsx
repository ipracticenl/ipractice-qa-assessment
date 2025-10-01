import { Plus } from "lucide-react";
import type { FC } from "react";
import { DateTimePicker24h } from "../date-time-picker";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface AddAvailabilityPanelProps {
  startTime: Date | undefined;
  endTime: Date | undefined;
  setStartTime: (date: Date | undefined) => void;
  setEndTime: (date: Date | undefined) => void;
  handleAddAvailability: () => void;
  handleUpdateAvailability: () => void;
  cancelEdit: () => void;
  editingId: boolean;
}

export const AddAvailabilityPanel: FC<AddAvailabilityPanelProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  handleAddAvailability,
  handleUpdateAvailability,
  cancelEdit,
  editingId,
}) => {
  return (
    <Card data-testid="add-availability-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="start-time"
            >
              From
            </label>
            <DateTimePicker24h
              value={startTime}
              onChange={setStartTime}
              testId="start-time-picker"
              ariaLabel="Select start time for availability"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="end-time"
            >
              To
            </label>
            <DateTimePicker24h
              value={endTime}
              onChange={setEndTime}
              testId="end-time-picker"
              ariaLabel="Select end time for availability"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={
              editingId ? handleUpdateAvailability : handleAddAvailability
            }
            className="flex-1 min-h-[44px] touch-manipulation"
            disabled={!startTime || !endTime}
            data-testid={
              editingId
                ? "update-availability-button"
                : "add-availability-button"
            }
            aria-describedby="availability-button-help"
          >
            {editingId ? "Update" : "Add"}
          </Button>
          <div id="availability-button-help" className="sr-only">
            {editingId
              ? "Update the selected availability slot"
              : "Add a new availability slot"}
          </div>

          {editingId && (
            <Button
              onClick={cancelEdit}
              variant="outline"
              className="min-h-[44px] touch-manipulation bg-transparent"
              data-testid="cancel-edit-button"
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
