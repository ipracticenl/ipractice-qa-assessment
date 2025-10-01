import { Calendar, Clock, UserCheck, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Appointment, PsychologistSummaryDto } from "@/types";
import type { FC } from "react";

interface MyAppointmentsPanelProps {
  appointments: Appointment[];
  psychologists: PsychologistSummaryDto[];
  onCancelAppointment: (appointmentId: string) => void;
}

export const MyAppointmentsPanel: FC<MyAppointmentsPanelProps> = ({
  appointments,
  psychologists,
  onCancelAppointment,
}) => {
  return (
    <Card data-testid="my-appointments-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
            {appointments.length}
          </span>
          My Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Psychologist</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No appointments scheduled yet
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => {
                  const psychologist = psychologists.find(
                    (p) => p.id === appointment.psychologistId
                  );
                  return (
                    <TableRow
                      key={appointment.id}
                      data-testid={`appointment-row-${appointment.id}`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{format(appointment.from, "MM/dd/yyyy")}</span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(appointment.from, "HH:mm")} -{" "}
                            {format(appointment.to, "HH:mm")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-green-600" />
                          {psychologist?.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {appointment.comment ? (
                          <div className="flex items-start gap-2 max-w-xs">
                            <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span
                              className="text-sm text-gray-700 break-words"
                              dangerouslySetInnerHTML={{
                                __html: appointment.comment,
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            No comments
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onCancelAppointment(appointment.id)}
                          className="min-h-[36px] touch-manipulation"
                          data-testid={`cancel-appointment-${appointment.id}`}
                          aria-label={`Cancel appointment with ${
                            psychologist?.name
                          } on ${format(appointment.from, "MM/dd/yyyy HH:mm")}`}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
