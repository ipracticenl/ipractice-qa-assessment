import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
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
import { Button } from "../ui/button";
import { AvailableTimeSlot } from "@/types";

interface EditAvailabilityPanelProps {
  userAvailabilities: AvailableTimeSlot[];
  handleEditAvailability: (availability: AvailableTimeSlot) => void;
  onDeleteAvailability: (availabilityId: string) => void;
}

export const EditAvailabilityPanel: FC<EditAvailabilityPanelProps> = ({
  userAvailabilities,
  handleEditAvailability,
  onDeleteAvailability,
}) => {
  return (
    <Card data-testid="edit-availability-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Edit Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userAvailabilities.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    No availability slots created yet
                  </TableCell>
                </TableRow>
              ) : (
                userAvailabilities.map((availability) => (
                  <TableRow
                    key={availability.id}
                    data-testid={`availability-row-${availability.id}`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span>{format(availability.from, "EEEE")}</span>
                        <span className="text-sm text-gray-600">
                          {format(availability.from, "HH:mm")} -{" "}
                          {format(availability.to, "HH:mm")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                        aria-label="This slot is available"
                      >
                        Available
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAvailability(availability)}
                          disabled={false}
                          className="min-h-[36px] touch-manipulation"
                          data-testid={`edit-availability-${availability.id}`}
                          aria-label={`Edit availability slot for ${format(
                            availability.from,
                            "EEEE HH:mm"
                          )}`}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDeleteAvailability(availability.id)}
                          disabled={false}
                          className="min-h-[36px] touch-manipulation"
                          data-testid={`delete-availability-${availability.id}`}
                          aria-label={`Delete availability slot for ${format(
                            availability.from,
                            "EEEE HH:mm"
                          )}`}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
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
