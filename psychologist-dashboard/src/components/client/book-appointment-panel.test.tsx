import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BookAppointmentPanel } from "./book-appointment-panel";
import { AvailableTimeSlot, PsychologistSummaryDto } from "@/types";

// Mock data with local timezone dates
const mockPsychologists: PsychologistSummaryDto[] = [
  { id: 1, name: "Dr. John Smith" },
  { id: 2, name: "Dr. Jane Doe" },
];

const mockAvailableSlots: AvailableTimeSlot[] = [
  {
    id: "slot-1",
    from: new Date("2024-01-15T10:00:00"),
    to: new Date("2024-01-15T11:00:00"),
  },
  {
    id: "slot-2",
    from: new Date("2024-01-16T14:00:00"),
    to: new Date("2024-01-16T15:00:00"),
  },
];

describe("BookAppointmentPanel", () => {
  const mockSetShowBooking = vi.fn();
  const mockSetSelectedPsychologist = vi.fn();
  const mockResetBookingFlow = vi.fn();
  const mockHandleBookAppointment = vi.fn();

  describe("Snapshot Tests", () => {
    it("should match snapshot when showing psychologist selection", () => {
      // Given: The component is in psychologist selection mode
      const showBooking = false;
      const selectedPsychologistId = null;

      // When: The component is rendered in selection mode
      const { container } = render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when showing available slots", () => {
      // Given: The component is in booking mode with available slots
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered in booking mode
      const { container } = render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when no available slots exist", () => {
      // Given: The component is in booking mode with no available slots
      const showBooking = true;
      const selectedPsychologistId = 1;
      const emptySlots: AvailableTimeSlot[] = [];

      // When: The component is rendered with no available slots
      const { container } = render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={emptySlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Psychologist Selection Mode", () => {
    it("should display psychologist selection when showBooking is false", () => {
      // Given: The component is in selection mode
      const showBooking = false;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={null}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The psychologist selector should be displayed
      expect(screen.getByText("Select Psychologist")).toBeInTheDocument();
      expect(screen.getByText("Choose a psychologist")).toBeInTheDocument();
    });

    it("should disable view available times button when no psychologist is selected", () => {
      // Given: No psychologist is selected
      const showBooking = false;
      const selectedPsychologistId = null;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The view available times button should be disabled
      const viewButton = screen.getByTestId("view-available-times-button");
      expect(viewButton).toBeDisabled();
    });

    it("should enable view available times button when psychologist is selected", () => {
      // Given: A psychologist is selected
      const showBooking = false;
      const selectedPsychologistId = 1;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The view available times button should be enabled
      const viewButton = screen.getByTestId("view-available-times-button");
      expect(viewButton).not.toBeDisabled();
    });

    it("should call setShowBooking when view available times button is clicked", () => {
      // Given: A psychologist is selected
      const showBooking = false;
      const selectedPsychologistId = 1;

      // When: The component is rendered and view button is clicked
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      const viewButton = screen.getByTestId("view-available-times-button");
      fireEvent.click(viewButton);

      // Then: setShowBooking should be called with true
      expect(mockSetShowBooking).toHaveBeenCalledWith(true);
    });
  });

  describe("Available Slots Display Mode", () => {
    it("should display available slots when showBooking is true", () => {
      // Given: The component is in booking mode with available slots
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: Available slots should be displayed
      expect(screen.getByTestId("available-slots-list")).toBeInTheDocument();
      expect(screen.getByTestId("available-slot-slot-1")).toBeInTheDocument();
      expect(screen.getByTestId("available-slot-slot-2")).toBeInTheDocument();
    });

    it("should display psychologist name in the header", () => {
      // Given: The component is in booking mode with a selected psychologist
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The psychologist name should be displayed in the header
      expect(
        screen.getByText("Available times for Dr. John Smith")
      ).toBeInTheDocument();
    });

    it.skip("should display slot information correctly", () => {
      // Given: The component is in booking mode with available slots
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: Slot information should be displayed correctly
      expect(screen.getByText("Monday, 01/15/2024")).toBeInTheDocument();
      expect(screen.getByText("Tuesday, 01/16/2024")).toBeInTheDocument();
      // Check for time ranges with flexible matching
      expect(
        // @ts-expect-error - This is a test
        screen.getByText((_content, element) => {
          return (
            element?.textContent?.includes("10:00") &&
            element?.textContent?.includes("11:00")
          );
        })
      ).toBeInTheDocument();
      expect(
        // @ts-expect-error - This is a test
        screen.getByText((_content, element) => {
          return (
            element?.textContent?.includes("14:00") &&
            element?.textContent?.includes("15:00")
          );
        })
      ).toBeInTheDocument();
    });

    it("should display empty state when no slots are available", () => {
      // Given: The component is in booking mode with no available slots
      const showBooking = true;
      const selectedPsychologistId = 1;
      const emptySlots: AvailableTimeSlot[] = [];

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={emptySlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: Empty state message should be displayed
      expect(screen.getByText("No available time slots")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Please check back later or select a different psychologist"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Booking Functionality", () => {
    it.skip("should call handleBookAppointment when book button is clicked", () => {
      // Given: The component is in booking mode with available slots
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered and book button is clicked
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      const bookButton = screen.getByTestId("book-slot-slot-1");
      fireEvent.click(bookButton);

      // Then: handleBookAppointment should be called with the correct slot ID
      expect(mockHandleBookAppointment).toHaveBeenCalledWith("slot-1");
    });

    it("should have correct aria-label for book buttons", () => {
      // Given: The component is in booking mode with available slots
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: Book buttons should have correct aria-labels
      const bookButton1 = screen.getByTestId("book-slot-slot-1");
      expect(bookButton1).toHaveAttribute("aria-label");
      expect(bookButton1.getAttribute("aria-label")).toContain(
        "Book appointment on Monday, 01/15/2024"
      );

      const bookButton2 = screen.getByTestId("book-slot-slot-2");
      expect(bookButton2).toHaveAttribute("aria-label");
      expect(bookButton2.getAttribute("aria-label")).toContain(
        "Book appointment on Tuesday, 01/16/2024"
      );
    });
  });

  describe("Navigation", () => {
    it("should call resetBookingFlow when back button is clicked", () => {
      // Given: The component is in booking mode
      const showBooking = true;
      const selectedPsychologistId = 1;

      // When: The component is rendered and back button is clicked
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={selectedPsychologistId}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      const backButton = screen.getByTestId("back-to-psychologist-selection");
      fireEvent.click(backButton);

      // Then: resetBookingFlow should be called
      expect(mockResetBookingFlow).toHaveBeenCalled();
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: The component is in selection mode
      const showBooking = false;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={null}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("book-appointment-panel")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
      // Given: The component is in selection mode
      const showBooking = false;

      // When: The component is rendered
      render(
        <BookAppointmentPanel
          psychologists={mockPsychologists}
          availableSlots={mockAvailableSlots}
          showBooking={showBooking}
          setShowBooking={mockSetShowBooking}
          selectedPsychologistId={null}
          setSelectedPsychologist={mockSetSelectedPsychologist}
          resetBookingFlow={mockResetBookingFlow}
          handleBookAppointment={mockHandleBookAppointment}
        />
      );

      // Then: The title should be displayed
      expect(screen.getByText("Book New Appointment")).toBeInTheDocument();
    });
  });
});
