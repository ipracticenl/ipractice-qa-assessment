// Base types
export interface User {
  id: number;
  name: string;
  type: "psychologist" | "client";
}

// Time range base type
export interface TimeRange {
  id: string;
  from: Date;
  to: Date;
}

// Client DTOs
export interface CreateClientDto {
  name: string;
  initialPsychologistIds: number[];
}

export interface ClientSummaryDto {
  id: number;
  name: string;
}

export interface ClientDetailsDto {
  id: number;
  name: string;
  assignedPsychologists: number[];
  bookedAppointments: Appointment[];
}

// Psychologist DTOs
export interface CreatePsychologistDto {
  name: string;
  initialClients: number[];
}

export interface PsychologistSummaryDto {
  id: number;
  name: string;
}

export interface PsychologistDetailsDto {
  id: number;
  name: string;
  assignedClients: number[];
  availableTimeSlots: AvailableTimeSlot[];
  bookedAppointments: BookedAppointment[];
}

// Booking DTOs
export interface CreateBookingDto {
  psychologistId: number;
  availableTimeSlotId: string;
  comment?: string;
}

export interface ClientDto {
  clientId: number;
}

export interface TimeSlotDto {
  from: Date;
  to: Date;
}

// Model types
export interface AvailableTimeSlot extends TimeRange {
  // Inherits id, from, to from TimeRange
}

export interface Appointment extends TimeRange {
  psychologistId: number;
  comment?: string;
}

export interface BookedAppointment extends TimeRange {
  clientId: number;
}

// Legacy types for backward compatibility
export interface Psychologist extends User {
  type: "psychologist";
  clients: string[];
}

export interface Client extends User {
  type: "client";
  psychologist?: string;
}

export interface Availability {
  id: string;
  psychologistId: number;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  clientId?: string;
  clientName?: string;
}
