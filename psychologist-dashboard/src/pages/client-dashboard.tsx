import { FC, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useUser } from "@/lib/context";
import { MyAppointmentsPanel } from "@/components/client/my-appointments-panel";
import {
  useBookAppointment,
  useCancelAppointment,
  useClient,
} from "@/lib/api/hooks/use-client";
import { useAllPsychologists, usePsychologist } from "@/lib/api/hooks";
import { BookAppointmentPanel } from "@/components/client/book-appointment-panel";

export const ClientDashboard: FC = () => {
  const { currentUser } = useUser();
  const { data: client } = useClient(currentUser?.id);
  const { data: psychologists } = useAllPsychologists();
  const [selectedPsychologistId, setSelectedPsychologistId] = useState<
    number | null
  >(null);
  const { data: psychologist } = usePsychologist(
    selectedPsychologistId ?? undefined
  );
  const [showBooking, setShowBooking] = useState(false);
  const { mutateAsync: bookAppointment } = useBookAppointment();
  const { mutateAsync: cancelAppointment } = useCancelAppointment();

  const handleBookAppointment = (
    availableTimeSlotId: string,
    comment?: string
  ) => {
    bookAppointment({
      clientId: client?.id!,
      data: {
        psychologistId: selectedPsychologistId!,
        availableTimeSlotId,
        comment,
      },
    })
      .then(() => {
        setShowBooking(false);
        setSelectedPsychologistId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetBookingFlow = () => {
    setShowBooking(false);
  };

  const onCancelAppointment = (appointmentId: string) => {
    cancelAppointment({
      clientId: client?.id!,
      appointmentId,
    }).catch((error) => {
      console.error(error);
    });
  };

  const assignedPsychologists = useMemo(() => {
    return (
      psychologists?.filter((p) =>
        client?.assignedPsychologists.includes(p.id)
      ) ?? []
    );
  }, [psychologists, client]);

  return (
    <DashboardLayout title="Client Dashboard">
      <MyAppointmentsPanel
        appointments={client?.bookedAppointments ?? []}
        psychologists={psychologists ?? []}
        onCancelAppointment={onCancelAppointment}
      />

      <BookAppointmentPanel
        psychologists={assignedPsychologists}
        availableSlots={psychologist?.availableTimeSlots ?? []}
        showBooking={showBooking}
        setShowBooking={setShowBooking}
        selectedPsychologistId={selectedPsychologistId}
        setSelectedPsychologist={setSelectedPsychologistId}
        resetBookingFlow={resetBookingFlow}
        handleBookAppointment={handleBookAppointment}
      />
    </DashboardLayout>
  );
};
