import { Client, Appointment, Availability } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Client API functions
export interface CreateClientData {
  name: string;
  initialPsychologistIds: number[];
}

export interface CreateBookingData {
  psychologistId: number;
  availableTimeSlotId: string;
}

export interface AvailableTimeSlotsResult {
  psychologistId: number;
  psychologistName: string;
  availableTimeSlots: Availability[];
}

// Create a new client
export async function createClient(data: CreateClientData): Promise<Client> {
  const response = await fetch(`${API_BASE_URL}/Client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creating client");
  }

  return response.json();
}

// Get client by ID
export async function getClient(id: number): Promise<Client> {
  const response = await fetch(`${API_BASE_URL}/Client/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching client");
  }

  return response.json();
}

// Get available time slots for a client
export async function getAvailableTimeSlots(
  clientId: number
): Promise<AvailableTimeSlotsResult[]> {
  const response = await fetch(
    `${API_BASE_URL}/Client/${clientId}/available-timeslots`
  );

  if (!response.ok) {
    throw new Error("Error fetching available time slots");
  }

  return response.json();
}

// Book an appointment
export async function bookAppointment(
  clientId: number,
  data: CreateBookingData
): Promise<Appointment> {
  const response = await fetch(`${API_BASE_URL}/Client/${clientId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error booking appointment");
  }

  return response.json();
}

// Cancel an appointment
export async function cancelAppointment(
  clientId: number,
  appointmentId: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/Client/${clientId}/bookings/${appointmentId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error canceling appointment");
  }
}
