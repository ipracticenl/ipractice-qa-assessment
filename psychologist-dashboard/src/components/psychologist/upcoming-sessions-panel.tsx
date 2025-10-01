import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { BookedAppointment } from "@/types";
import { UpcomingSessionsRow } from "./upcoming-sessions-row";

interface UpcomingSessionsPanelProps {
  bookedSessions: BookedAppointment[];
  onCancelSession: (sessionId: string, clientId: number) => void;
}

export const UpcomingSessionsPanel: FC<UpcomingSessionsPanelProps> = ({
  bookedSessions,
  onCancelSession,
}) => {
  return (
    <Card data-testid="upcoming-sessions-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
            {bookedSessions.length}
          </span>
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedSessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    No upcoming sessions scheduled
                  </TableCell>
                </TableRow>
              ) : (
                bookedSessions.map((session) => (
                  <UpcomingSessionsRow
                    key={session.id}
                    session={session}
                    onCancelSession={onCancelSession}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
