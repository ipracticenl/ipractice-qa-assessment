import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EditAvailabilityPanel } from "./edit-availability-panel";
import { AvailableTimeSlot } from "@/types";

// Mock data
const mockAvailabilities: AvailableTimeSlot[] = [
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

describe("EditAvailabilityPanel", () => {
  const mockHandleEditAvailability = vi.fn();
  const mockOnDeleteAvailability = vi.fn();

  describe("Snapshot Tests", () => {
    it("should match snapshot when no availabilities exist", () => {
      // Given: No availabilities are provided
      const emptyAvailabilities: AvailableTimeSlot[] = [];

      // When: The component is rendered with no availabilities
      const { container } = render(
        <EditAvailabilityPanel
          userAvailabilities={emptyAvailabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when availabilities exist", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered with availabilities
      const { container } = render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Empty State", () => {
    it("should display empty state message when no availabilities exist", () => {
      // Given: No availabilities are provided
      const emptyAvailabilities: AvailableTimeSlot[] = [];

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={emptyAvailabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The empty state message should be displayed
      expect(
        screen.getByText("No availability slots created yet")
      ).toBeInTheDocument();
    });
  });

  describe("Availabilities Display", () => {
    it("should display availabilities when they exist", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: Availability rows should be displayed
      expect(screen.getByTestId("availability-row-slot-1")).toBeInTheDocument();
      expect(screen.getByTestId("availability-row-slot-2")).toBeInTheDocument();
    });

    it("should display availability date and time correctly", () => {
      // Given: An availability is provided
      const availabilities = [mockAvailabilities[0]];

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The date and time should be formatted correctly
      expect(screen.getByText("Monday")).toBeInTheDocument();
      expect(screen.getByText("10:00 - 11:00")).toBeInTheDocument();
    });

    it('should display status as "Available" for all slots', () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: All slots should show "Available" status
      const availableStatuses = screen.getAllByText("Available");
      expect(availableStatuses).toHaveLength(2);
    });

    it("should have correct aria-label for status badges", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: Status badges should have correct aria-label
      const statusBadges = screen.getAllByLabelText("This slot is available");
      expect(statusBadges).toHaveLength(2);
    });
  });

  describe("Edit Functionality", () => {
    it("should call handleEditAvailability when edit button is clicked", () => {
      // Given: An availability is provided and the edit function is mocked
      const availabilities = [mockAvailabilities[0]];
      const mockEditFunction = vi.fn();

      // When: The component is rendered and edit button is clicked
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockEditFunction}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      const editButton = screen.getByTestId("edit-availability-slot-1");
      fireEvent.click(editButton);

      // Then: The edit function should be called with the correct availability
      expect(mockEditFunction).toHaveBeenCalledWith(mockAvailabilities[0]);
    });

    it("should have correct aria-label for edit buttons", () => {
      // Given: An availability is provided
      const availabilities = [mockAvailabilities[0]];

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The edit button should have the correct aria-label
      const editButton = screen.getByTestId("edit-availability-slot-1");
      expect(editButton).toHaveAttribute("aria-label");
      expect(editButton.getAttribute("aria-label")).toContain(
        "Edit availability slot for Monday 10:00"
      );
    });
  });

  describe("Delete Functionality", () => {
    it("should call onDeleteAvailability when delete button is clicked", () => {
      // Given: An availability is provided and the delete function is mocked
      const availabilities = [mockAvailabilities[0]];
      const mockDeleteFunction = vi.fn();

      // When: The component is rendered and delete button is clicked
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockDeleteFunction}
        />
      );

      const deleteButton = screen.getByTestId("delete-availability-slot-1");
      fireEvent.click(deleteButton);

      // Then: The delete function should be called with the correct availability ID
      expect(mockDeleteFunction).toHaveBeenCalledWith("slot-1");
    });

    it("should have correct aria-label for delete buttons", () => {
      // Given: An availability is provided
      const availabilities = [mockAvailabilities[0]];

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The delete button should have the correct aria-label
      const deleteButton = screen.getByTestId("delete-availability-slot-1");
      expect(deleteButton).toHaveAttribute("aria-label");
      expect(deleteButton.getAttribute("aria-label")).toContain(
        "Delete availability slot for Monday 10:00"
      );
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("edit-availability-panel")).toBeInTheDocument();
    });

    it("should render table headers correctly", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The table headers should be displayed
      expect(screen.getByText("Time Slot")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
      // Given: Availabilities are provided
      const availabilities = mockAvailabilities;

      // When: The component is rendered
      render(
        <EditAvailabilityPanel
          userAvailabilities={availabilities}
          handleEditAvailability={mockHandleEditAvailability}
          onDeleteAvailability={mockOnDeleteAvailability}
        />
      );

      // Then: The title should be displayed
      expect(screen.getByText("Edit Availability")).toBeInTheDocument();
    });
  });
});
