import { useMemo, useState, type FC } from "react";
import type { AvailableTimeSlot } from "../types";
import { useUser } from "@/lib/context";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  useCancelSession,
  usePsychologist,
  useAllClients,
  useCreateAvailableTimeSlot,
  useDeleteAvailableTimeSlot,
  useUpdateAvailableTimeSlot,
} from "@/lib/api/hooks";
import { UpcomingSessionsPanel } from "@/components/psychologist/upcoming-sessions-panel";
import { AssignedClientsPanel } from "@/components/psychologist/assigned-clients-panel";
import { AddAvailabilityPanel } from "@/components/psychologist/add-availability-panel";
import { EditAvailabilityPanel } from "@/components/psychologist/edit-availability-panel";

export const PsychologistDashboard: FC = () => {
  const { currentUser } = useUser();
  const { data: psychologist } = usePsychologist(currentUser?.id);
  const { mutateAsync: cancelSession } = useCancelSession();
  const { data: clients } = useAllClients();
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const { mutateAsync: addAvailability } = useCreateAvailableTimeSlot();
  const { mutateAsync: deleteAvailability } = useDeleteAvailableTimeSlot();
  const { mutateAsync: updateAvailability } = useUpdateAvailableTimeSlot();

  const bookedSessions = psychologist?.bookedAppointments ?? [];
  const onCancelSession = (sessionId: string, clientId: number) => {
    cancelSession({
      clientId,
      appointmentId: sessionId,
      psychologistId: currentUser?.id!,
    });
  };

  const assignedClients = useMemo(() => {
    return (
      clients?.filter((client) =>
        psychologist?.assignedClients?.some(
          (clientId) => clientId === client.id
        )
      ) ?? []
    );
  }, [clients, psychologist?.assignedClients]);

  const handleAddAvailability = () => {
    addAvailability({
      psychologistId: currentUser?.id!,
      data: {
        from: startTime!,
        to: endTime!,
      },
    }).then(() => {
      setStartTime(undefined);
      setEndTime(undefined);
    });
  };

  const handleDeleteAvailability = (availabilityId: string) => {
    deleteAvailability({
      psychologistId: currentUser?.id!,
      timeSlotId: availabilityId,
    });
  };

  const handleEditAvailability = (availability: AvailableTimeSlot) => {
    setEditingId(availability.id);
    setStartTime(new Date(availability.from));
    setEndTime(new Date(availability.to));
  };

  const handleCancelEdit = () => {
    setEditingId(undefined);
    setStartTime(undefined);
    setEndTime(undefined);
  };

  const handleUpdateAvailability = () => {
    updateAvailability({
      psychologistId: currentUser?.id!,
      timeSlotId: editingId!,
      data: {
        from: startTime!,
        to: endTime!,
      },
    })
      .then(() => {
        handleCancelEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DashboardLayout title="Psychologist Dashboard">
      <UpcomingSessionsPanel
        bookedSessions={bookedSessions}
        onCancelSession={onCancelSession}
      />
      <AssignedClientsPanel assignedClients={assignedClients} />
      <AddAvailabilityPanel
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        handleAddAvailability={handleAddAvailability}
        handleUpdateAvailability={handleUpdateAvailability}
        cancelEdit={handleCancelEdit}
        editingId={!!editingId}
      />
      <EditAvailabilityPanel
        userAvailabilities={psychologist?.availableTimeSlots ?? []}
        handleEditAvailability={handleEditAvailability}
        onDeleteAvailability={handleDeleteAvailability}
      />
    </DashboardLayout>
  );
};
