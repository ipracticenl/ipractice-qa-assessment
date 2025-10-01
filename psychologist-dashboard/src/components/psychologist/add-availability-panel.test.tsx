import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AddAvailabilityPanel } from "./add-availability-panel";

describe("AddAvailabilityPanel", () => {
  const mockSetStartTime = vi.fn();
  const mockSetEndTime = vi.fn();
  const mockHandleAddAvailability = vi.fn();
  const mockHandleUpdateAvailability = vi.fn();
  const mockCancelEdit = vi.fn();

  describe("Snapshot Tests", () => {
    it("should match snapshot when in add mode with no times selected", () => {
      // Given: The component is in add mode with no times selected
      const startTime = undefined;
      const endTime = undefined;
      const editingId = false;

      // When: The component is rendered
      const { container } = render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when in edit mode with times selected", () => {
      // Given: The component is in edit mode with times selected
      const startTime = new Date("2024-01-15T10:00:00Z");
      const endTime = new Date("2024-01-15T11:00:00Z");
      const editingId = true;

      // When: The component is rendered
      const { container } = render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when in add mode with times selected", () => {
      // Given: The component is in add mode with times selected
      const startTime = new Date("2024-01-15T10:00:00Z");
      const endTime = new Date("2024-01-15T11:00:00Z");
      const editingId = false;

      // When: The component is rendered
      const { container } = render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Add Mode", () => {
    it("should display add button when not in edit mode", () => {
      // Given: The component is in add mode
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={undefined}
          endTime={undefined}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The add button should be displayed
      expect(screen.getByTestId("add-availability-button")).toBeInTheDocument();
      expect(screen.getByText("Add")).toBeInTheDocument();
    });

    it("should disable add button when times are not selected", () => {
      // Given: The component is in add mode with no times selected
      const startTime = undefined;
      const endTime = undefined;
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The add button should be disabled
      const addButton = screen.getByTestId("add-availability-button");
      expect(addButton).toBeDisabled();
    });

    it("should enable add button when both times are selected", () => {
      // Given: The component is in add mode with both times selected
      const startTime = new Date("2024-01-15T10:00:00Z");
      const endTime = new Date("2024-01-15T11:00:00Z");
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The add button should be enabled
      const addButton = screen.getByTestId("add-availability-button");
      expect(addButton).not.toBeDisabled();
    });

    it("should call handleAddAvailability when add button is clicked", () => {
      // Given: The component is in add mode with times selected
      const startTime = new Date("2024-01-15T10:00:00Z");
      const endTime = new Date("2024-01-15T11:00:00Z");
      const editingId = false;

      // When: The component is rendered and add button is clicked
      render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      const addButton = screen.getByTestId("add-availability-button");
      fireEvent.click(addButton);

      // Then: handleAddAvailability should be called
      expect(mockHandleAddAvailability).toHaveBeenCalled();
    });
  });

  describe("Edit Mode", () => {
    it("should display update button when in edit mode", () => {
      // Given: The component is in edit mode
      const editingId = true;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={new Date("2024-01-15T10:00:00Z")}
          endTime={new Date("2024-01-15T11:00:00Z")}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The update button should be displayed
      expect(
        screen.getByTestId("update-availability-button")
      ).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
    });

    it("should display cancel button when in edit mode", () => {
      // Given: The component is in edit mode
      const editingId = true;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={new Date("2024-01-15T10:00:00Z")}
          endTime={new Date("2024-01-15T11:00:00Z")}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The cancel button should be displayed
      expect(screen.getByTestId("cancel-edit-button")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("should call handleUpdateAvailability when update button is clicked", () => {
      // Given: The component is in edit mode with times selected
      const startTime = new Date("2024-01-15T10:00:00Z");
      const endTime = new Date("2024-01-15T11:00:00Z");
      const editingId = true;

      // When: The component is rendered and update button is clicked
      render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      const updateButton = screen.getByTestId("update-availability-button");
      fireEvent.click(updateButton);

      // Then: handleUpdateAvailability should be called
      expect(mockHandleUpdateAvailability).toHaveBeenCalled();
    });

    it("should call cancelEdit when cancel button is clicked", () => {
      // Given: The component is in edit mode
      const editingId = true;

      // When: The component is rendered and cancel button is clicked
      render(
        <AddAvailabilityPanel
          startTime={new Date("2024-01-15T10:00:00Z")}
          endTime={new Date("2024-01-15T11:00:00Z")}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      const cancelButton = screen.getByTestId("cancel-edit-button");
      fireEvent.click(cancelButton);

      // Then: cancelEdit should be called
      expect(mockCancelEdit).toHaveBeenCalled();
    });

    it("should not display cancel button when not in edit mode", () => {
      // Given: The component is not in edit mode
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={new Date("2024-01-15T10:00:00Z")}
          endTime={new Date("2024-01-15T11:00:00Z")}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The cancel button should not be displayed
      expect(
        screen.queryByTestId("cancel-edit-button")
      ).not.toBeInTheDocument();
    });
  });

  describe("DateTimePicker Integration", () => {
    it("should render start time picker with correct props", () => {
      // Given: The component is rendered
      const startTime = new Date("2024-01-15T10:00:00Z");

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={startTime}
          endTime={undefined}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={false}
        />
      );

      // Then: The start time picker should be rendered with correct props
      const startTimePicker = screen.getByTestId("start-time-picker");
      expect(startTimePicker).toBeInTheDocument();
      expect(startTimePicker).toHaveAttribute(
        "aria-label",
        "Select start time for availability"
      );
    });

    it("should render end time picker with correct props", () => {
      // Given: The component is rendered
      const endTime = new Date("2024-01-15T11:00:00Z");

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={undefined}
          endTime={endTime}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={false}
        />
      );

      // Then: The end time picker should be rendered with correct props
      const endTimePicker = screen.getByTestId("end-time-picker");
      expect(endTimePicker).toBeInTheDocument();
      expect(endTimePicker).toHaveAttribute(
        "aria-label",
        "Select end time for availability"
      );
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: The component is rendered
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={undefined}
          endTime={undefined}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("add-availability-panel")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
      // Given: The component is rendered
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={undefined}
          endTime={undefined}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The title should be displayed
      expect(screen.getByText("Add Availability")).toBeInTheDocument();
    });

    it("should display correct labels", () => {
      // Given: The component is rendered
      const editingId = false;

      // When: The component is rendered
      render(
        <AddAvailabilityPanel
          startTime={undefined}
          endTime={undefined}
          setStartTime={mockSetStartTime}
          setEndTime={mockSetEndTime}
          handleAddAvailability={mockHandleAddAvailability}
          handleUpdateAvailability={mockHandleUpdateAvailability}
          cancelEdit={mockCancelEdit}
          editingId={editingId}
        />
      );

      // Then: The labels should be displayed
      expect(screen.getByText("From")).toBeInTheDocument();
      expect(screen.getByText("To")).toBeInTheDocument();
    });
  });
});
