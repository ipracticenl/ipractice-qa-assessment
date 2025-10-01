import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllPsychologists,
  getPsychologistByName,
  createPsychologist,
  getPsychologist,
  assignClientToPsychologist,
  createAvailableTimeSlot,
  updateAvailableTimeSlot,
  deleteAvailableTimeSlot,
  type CreatePsychologistData,
  type AssignClientData,
  type TimeSlotData,
} from "../psychologist";
import { cancelAppointment } from "../client";

// Hook to get all psychologists
export const useAllPsychologists = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["psychologists"],
    queryFn: () => getAllPsychologists(),
    enabled,
  });
};

// Hook to get a psychologist by name
export const usePsychologistByName = (name?: string) => {
  return useQuery({
    queryKey: ["psychologist", "name", name],
    queryFn: () => getPsychologistByName(name!),
    enabled: !!name,
  });
};

// Hook to get a psychologist by ID
export const usePsychologist = (psychologistId?: number) => {
  return useQuery({
    queryKey: ["psychologist", psychologistId],
    queryFn: () => getPsychologist(psychologistId!),
    enabled: !!psychologistId,
  });
};

// Hook to create a new psychologist
export const useCreatePsychologist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePsychologistData) => createPsychologist(data),
    onSuccess: (newPsychologist) => {
      // Invalidate and refetch psychologist queries
      queryClient.invalidateQueries({ queryKey: ["psychologist"] });
      // Optionally add the new psychologist to the cache
      queryClient.setQueryData(
        ["psychologist", newPsychologist.id],
        newPsychologist
      );
      toast.success("Psychologist created successfully!");
    },
    onError: () => {
      toast.error("Failed to create psychologist. Please try again.");
    },
  });
};

// Hook to assign a client to a psychologist
export const useAssignClientToPsychologist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      psychologistId,
      data,
    }: {
      psychologistId: number;
      data: AssignClientData;
    }) => assignClientToPsychologist(psychologistId, data),
    onSuccess: (updatedPsychologist, { psychologistId }) => {
      // Update the psychologist in the cache
      queryClient.setQueryData(
        ["psychologist", psychologistId],
        updatedPsychologist
      );
      // Invalidate client queries as they might have changed
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Client assigned successfully!");
    },
    onError: () => {
      toast.error("Failed to assign client. Please try again.");
    },
  });
};

// Hook to create an available time slot for a psychologist
export const useCreateAvailableTimeSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      psychologistId,
      data,
    }: {
      psychologistId: number;
      data: TimeSlotData;
    }) => createAvailableTimeSlot(psychologistId, data),
    onSuccess: (updatedPsychologist, { psychologistId }) => {
      // Update the psychologist in the cache
      queryClient.setQueryData(
        ["psychologist", psychologistId],
        updatedPsychologist
      );
      // Invalidate available time slots queries
      queryClient.invalidateQueries({ queryKey: ["availableTimeSlots"] });
      toast.success("Time slot created successfully!");
    },
    onError: () => {
      toast.error("Failed to create time slot. Please try again.");
    },
  });
};

// Hook to update an available time slot for a psychologist
export const useUpdateAvailableTimeSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      psychologistId,
      timeSlotId,
      data,
    }: {
      psychologistId: number;
      timeSlotId: string;
      data: TimeSlotData;
    }) => updateAvailableTimeSlot(psychologistId, timeSlotId, data),
    onSuccess: (updatedPsychologist, { psychologistId }) => {
      // Update the psychologist in the cache
      queryClient.setQueryData(
        ["psychologist", psychologistId],
        updatedPsychologist
      );
      // Invalidate available time slots queries
      queryClient.invalidateQueries({ queryKey: ["availableTimeSlots"] });
      toast.success("Time slot updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update time slot. Please try again.");
    },
  });
};

// Hook to cancel an session
export const useCancelSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      appointmentId,
    }: {
      clientId: number;
      appointmentId: string;
      psychologistId: number;
    }) => cancelAppointment(clientId, appointmentId),
    onSuccess: () => {
      const invalidateQueries = async () => {
        // Invalidate available time slots to reflect the cancellation
        queryClient.invalidateQueries({
          queryKey: ["psychologist"],
        });

        // Invalidate any appointment-related queries
        queryClient.invalidateQueries({ queryKey: ["appointments"] });

        toast.success("Session cancelled successfully!");
      };

      if (Math.random() < 0.5) {
        setTimeout(() => {
          invalidateQueries();
        }, 5000);
      } else {
        invalidateQueries();
      }
    },
    onError: () => {
      toast.error("Failed to cancel session. Please try again.");
    },
  });
};

// Hook to delete an available time slot for a psychologist
export const useDeleteAvailableTimeSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      psychologistId,
      timeSlotId,
    }: {
      psychologistId: number;
      timeSlotId: string;
    }) => deleteAvailableTimeSlot(psychologistId, timeSlotId),
    onSuccess: (updatedPsychologist, { psychologistId }) => {
      // Update the psychologist in the cache
      queryClient.setQueryData(
        ["psychologist", psychologistId],
        updatedPsychologist
      );
      // Invalidate available time slots queries
      queryClient.invalidateQueries({ queryKey: ["availableTimeSlots"] });
      toast.success("Time slot deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete time slot. Please try again.");
    },
  });
};
