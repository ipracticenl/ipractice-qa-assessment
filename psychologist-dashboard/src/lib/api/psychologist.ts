import {
  Psychologist,
  CreatePsychologistDto,
  ClientDto,
  TimeSlotDto,
  PsychologistDetailsDto,
  PsychologistSummaryDto,
} from "../../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Psychologist API interfaces
export interface CreatePsychologistData extends CreatePsychologistDto {}

export interface AssignClientData extends ClientDto {}

export interface TimeSlotData extends TimeSlotDto {}

// Get all psychologists
export const getAllPsychologists = async (): Promise<
  PsychologistSummaryDto[]
> => {
  const response = await fetch(`${API_BASE_URL}/Psychologist`);

  if (!response.ok) {
    throw new Error("Error fetching psychologists");
  }

  return response.json();
};

// Get psychologist by name
export const getPsychologistByName = async (
  name: string
): Promise<PsychologistSummaryDto> => {
  const response = await fetch(
    `${API_BASE_URL}/Psychologist/by-name/${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Psychologist not found");
    }
    throw new Error("Error fetching psychologist");
  }

  return response.json();
};

// Create a new psychologist
export const createPsychologist = async (
  data: CreatePsychologistData
): Promise<Psychologist> => {
  const response = await fetch(`${API_BASE_URL}/Psychologist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creating psychologist");
  }

  return response.json();
};

// Get psychologist by ID
export const getPsychologist = async (
  id: number
): Promise<PsychologistDetailsDto> => {
  const response = await fetch(`${API_BASE_URL}/Psychologist/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Psychologist not found");
    }
    throw new Error("Error fetching psychologist");
  }

  return response.json();
};

// Assign a new client to a psychologist
export const assignClientToPsychologist = async (
  psychologistId: number,
  data: AssignClientData
): Promise<Psychologist> => {
  const response = await fetch(
    `${API_BASE_URL}/Psychologist/${psychologistId}/clients`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error assigning client to psychologist");
  }

  return response.json();
};

// Create a new available time slot for a psychologist
export const createAvailableTimeSlot = async (
  psychologistId: number,
  data: TimeSlotData
): Promise<Psychologist> => {
  const response = await fetch(
    `${API_BASE_URL}/Psychologist/${psychologistId}/available-timeslots`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error creating available time slot");
  }

  return response.json();
};

// Update an existing available time slot for a psychologist
export const updateAvailableTimeSlot = async (
  psychologistId: number,
  timeSlotId: string,
  data: TimeSlotData
): Promise<Psychologist> => {
  const response = await fetch(
    `${API_BASE_URL}/Psychologist/${psychologistId}/available-timeslots/${timeSlotId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error updating available time slot");
  }

  return response.json();
};

// Delete an available time slot for a psychologist
export const deleteAvailableTimeSlot = async (
  psychologistId: number,
  timeSlotId: string
): Promise<Psychologist> => {
  const response = await fetch(
    `${API_BASE_URL}/Psychologist/${psychologistId}/available-timeslots/${timeSlotId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error deleting available time slot");
  }

  return response.json();
};
