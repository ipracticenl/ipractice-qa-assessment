import { UserMinus } from "lucide-react";
import { format } from "date-fns";
import type { FC } from "react";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "../ui/table";
import { BookedAppointment } from "@/types";
import { useClient } from "@/lib/api/hooks";

interface UpcomingSessionsRowProps {
  session: BookedAppointment;
  onCancelSession: (sessionId: string, clientId: number) => void;
}

export const UpcomingSessionsRow: FC<UpcomingSessionsRowProps> = ({
  session,
  onCancelSession,
}) => {
  const { data: client } = useClient(session.clientId);
  return (
    <TableRow data-testid={`session-row-${session.id}`}>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{format(session.from, "MM/dd/yyyy")}</span>
          <span className="text-sm text-gray-600">
            {format(session.from, "HH:mm")} - {format(session.to, "HH:mm")}
          </span>
        </div>
      </TableCell>
      <TableCell>{client?.name}</TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onCancelSession(session.id, session.clientId)}
          className="min-h-[36px] touch-manipulation"
          data-testid={`remove-session-${session.id}`}
          aria-label={`Cancel session with ${client?.name} on ${format(
            session.from,
            "MM/dd/yyyy HH:mm"
          )}`}
        >
          <UserMinus className="w-3 h-3 mr-1" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};
