import { useEffect, useRef, type FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { ClientSummaryDto } from "@/types";

interface AssignedClientsPanelProps {
  assignedClients: ClientSummaryDto[];
}

export const AssignedClientsPanel: FC<AssignedClientsPanelProps> = ({
  assignedClients,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const limitPx = 140;

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    if (!container) return;

    function handleScroll() {
      const maxScrollTop =
        container.scrollHeight - container.clientHeight - limitPx;
      if (container.scrollTop > maxScrollTop) {
        container.scrollTop = maxScrollTop;
      }
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [limitPx]);

  return (
    <Card data-testid="assigned-clients-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold">
            {assignedClients.length}
          </span>
          Assigned Clients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="max-h-[300px] overflow-y-auto">
          <Table disableOverflow>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedClients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center py-8 text-gray-500"
                  >
                    No clients assigned yet
                  </TableCell>
                </TableRow>
              ) : (
                assignedClients.map((client) => (
                  <TableRow
                    key={client.id}
                    data-testid={`client-row-${client.id}`}
                  >
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        aria-label="Client is active"
                      >
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
