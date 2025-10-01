import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createClient,
  getClient,
  getClientByName,
  getAllClients,
  getAvailableTimeSlots,
  bookAppointment,
  cancelAppointment,
  type CreateClientData,
  type CreateBookingData,
} from "../client";

// Hook to get a client by ID
export const useClient = (clientId?: number) => {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClient(clientId!),
    enabled: !!clientId,
  });
};

// Hook to get all clients
export const useAllClients = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getAllClients(),
    enabled,
  });
};

// Hook to get a client by name
export const useClientByName = (clientName?: string) => {
  return useQuery({
    queryKey: ["client", "by-name", clientName],
    queryFn: () => getClientByName(clientName!),
    enabled: !!clientName,
  });
};

// Hook to get available time slots for a client
export const useAvailableTimeSlots = (clientId?: number) => {
  return useQuery({
    queryKey: ["availableTimeSlots", clientId],
    queryFn: () => getAvailableTimeSlots(clientId!),
    enabled: !!clientId,
  });
};

// Hook to create a new client
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientData) => createClient(data),
    onSuccess: (newClient) => {
      // Invalidate and refetch client queries
      queryClient.invalidateQueries({ queryKey: ["client"] });
      // Optionally add the new client to the cache
      queryClient.setQueryData(["client", newClient.id], newClient);
      toast.success("Client created successfully!");
    },
    onError: () => {
      toast.error("Failed to create client. Please try again.");
    },
  });
};

// Hook to book an appointment
export const useBookAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      data,
    }: {
      clientId: number;
      data: CreateBookingData;
    }) => bookAppointment(clientId, data),
    onSuccess: (_, { clientId, data }) => {
      // Invalidate available time slots to reflect the booking
      queryClient.invalidateQueries({
        queryKey: ["availableTimeSlots", clientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["client", clientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["psychologists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["psychologist", data.psychologistId],
      });
      // Invalidate any appointment-related queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment booked successfully!");
    },
    onError: () => {
      toast.error("Failed to book appointment. Please try again.");
    },
  });
};

// Hook to cancel an appointment
export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      appointmentId,
    }: {
      clientId: number;
      appointmentId: string;
    }) => cancelAppointment(clientId, appointmentId),
    onSuccess: (_, { clientId }) => {
      // Invalidate available time slots to reflect the cancellation
      queryClient.invalidateQueries({
        queryKey: ["availableTimeSlots", clientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["client", clientId],
      });

      // Invalidate any appointment-related queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["psychologist"] });
      toast.success("Appointment cancelled successfully!");
    },
    onError: () => {
      toast.error("Failed to cancel appointment. Please try again.");
    },
  });
};
