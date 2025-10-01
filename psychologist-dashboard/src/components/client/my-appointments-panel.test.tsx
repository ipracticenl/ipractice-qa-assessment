import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MyAppointmentsPanel } from "./my-appointments-panel";
import { Appointment, PsychologistSummaryDto } from "@/types";

// Mock data with local timezone dates
const mockPsychologists: PsychologistSummaryDto[] = [
  { id: 1, name: "Dr. John Smith" },
  { id: 2, name: "Dr. Jane Doe" },
];

const mockAppointments: Appointment[] = [
  {
    id: "appointment-1",
    psychologistId: 1,
    from: new Date("2024-01-15T10:00:00"),
    to: new Date("2024-01-15T11:00:00"),
  },
  {
    id: "appointment-2",
    psychologistId: 2,
    from: new Date("2024-01-16T14:00:00"),
    to: new Date("2024-01-16T15:00:00"),
  },
];

describe("MyAppointmentsPanel", () => {
  const mockOnCancelAppointment = vi.fn();

  describe("Snapshot Tests", () => {
    it("should match snapshot when no appointments exist", () => {
      // Given: No appointments are provided
      const emptyAppointments: Appointment[] = [];

      // When: The component is rendered with no appointments
      const { container } = render(
        <MyAppointmentsPanel
          appointments={emptyAppointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when appointments exist", () => {
      // Given: Appointments are provided
      const appointments = mockAppointments;

      // When: The component is rendered with appointments
      const { container } = render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Empty State", () => {
    it("should display empty state message when no appointments exist", () => {
      // Given: No appointments are provided
      const emptyAppointments: Appointment[] = [];

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={emptyAppointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The empty state message should be displayed
      expect(
        screen.getByText("No appointments scheduled yet")
      ).toBeInTheDocument();
    });

    it("should display correct appointment count in header", () => {
      // Given: No appointments are provided
      const emptyAppointments: Appointment[] = [];

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={emptyAppointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The appointment count should be 0
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Appointments Display", () => {
    it("should display appointments when they exist", () => {
      // Given: Appointments are provided
      const appointments = mockAppointments;

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: Appointment rows should be displayed
      expect(
        screen.getByTestId("appointment-row-appointment-1")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("appointment-row-appointment-2")
      ).toBeInTheDocument();
    });

    it("should display correct appointment count in header", () => {
      // Given: Appointments are provided
      const appointments = mockAppointments;

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The appointment count should be 2
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should display appointment date and time correctly", () => {
      // Given: An appointment is provided
      const appointments = [mockAppointments[0]];

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The date and time should be formatted correctly
      expect(screen.getByText("01/15/2024")).toBeInTheDocument();
      // Check for time range - use getAllByText to handle multiple matches
      // @ts-expect-error - This is a test
      const timeElements = screen.getAllByText((content, element) => {
        return (
          element?.textContent?.includes("10:00") &&
          element?.textContent?.includes("11:00")
        );
      });
      expect(timeElements.length).toBeGreaterThan(0);
    });

    it("should display psychologist name correctly", () => {
      // Given: An appointment with a psychologist is provided
      const appointments = [mockAppointments[0]];

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The psychologist name should be displayed
      expect(screen.getByText("Dr. John Smith")).toBeInTheDocument();
    });

    it('should display "Unknown" when psychologist is not found', () => {
      // Given: An appointment with a non-existent psychologist ID is provided
      const appointmentWithUnknownPsychologist: Appointment = {
        id: "appointment-3",
        psychologistId: 999, // Non-existent ID
        from: new Date("2024-01-15T10:00:00"),
        to: new Date("2024-01-15T11:00:00"),
      };

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={[appointmentWithUnknownPsychologist]}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The psychologist name should be undefined (not displayed)
      const psychologistCell = screen.getByTestId(
        "appointment-row-appointment-3"
      );
      expect(psychologistCell).toBeInTheDocument();
      // The name won't be displayed since it's undefined
    });
  });

  describe("Cancel Appointment Functionality", () => {
    it("should call onCancelAppointment when cancel button is clicked", () => {
      // Given: An appointment is provided and the cancel function is mocked
      const appointments = [mockAppointments[0]];
      const mockCancelFunction = vi.fn();

      // When: The component is rendered and cancel button is clicked
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockCancelFunction}
        />
      );

      const cancelButton = screen.getByTestId(
        "cancel-appointment-appointment-1"
      );
      fireEvent.click(cancelButton);

      // Then: The cancel function should be called with the correct appointment ID
      expect(mockCancelFunction).toHaveBeenCalledWith("appointment-1");
    });

    it("should have correct aria-label for cancel button", () => {
      // Given: An appointment is provided
      const appointments = [mockAppointments[0]];

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The cancel button should have the correct aria-label
      const cancelButton = screen.getByTestId(
        "cancel-appointment-appointment-1"
      );
      expect(cancelButton).toHaveAttribute("aria-label");
      expect(cancelButton.getAttribute("aria-label")).toContain(
        "Cancel appointment with Dr. John Smith"
      );
      expect(cancelButton.getAttribute("aria-label")).toContain("01/15/2024");
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: Appointments are provided
      const appointments = mockAppointments;

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("my-appointments-panel")).toBeInTheDocument();
    });

    it("should render table headers correctly", () => {
      // Given: Appointments are provided
      const appointments = mockAppointments;

      // When: The component is rendered
      render(
        <MyAppointmentsPanel
          appointments={appointments}
          psychologists={mockPsychologists}
          onCancelAppointment={mockOnCancelAppointment}
        />
      );

      // Then: The table headers should be displayed
      expect(screen.getByText("Date & Time")).toBeInTheDocument();
      expect(screen.getByText("Psychologist")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });
  });
});
