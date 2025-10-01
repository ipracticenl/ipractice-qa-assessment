import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpcomingSessionsRow } from "./upcoming-sessions-row";
import { BookedAppointment } from "@/types";

// Mock the useClient hook
vi.mock("@/lib/api/hooks", () => ({
  useClient: vi.fn(),
}));

// Import the mocked hook
import { useClient } from "@/lib/api/hooks";

// Mock data
const mockSession: BookedAppointment = {
  id: "session-1",
  from: new Date("2024-01-15T10:00:00"),
  to: new Date("2024-01-15T11:00:00"),
  clientId: 1,
};

const mockClient = {
  id: 1,
  name: "John Doe",
};

describe("UpcomingSessionsRow", () => {
  const mockOnCancelSession = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot when client data is loaded", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      const { container } = render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when client data is loading", () => {
      // Given: Client data is loading
      vi.mocked(useClient).mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      } as any);

      // When: The component is rendered
      const { container } = render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Session Display", () => {
    it("should display session date and time correctly", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The date and time should be formatted correctly
      expect(screen.getByText("01/15/2024")).toBeInTheDocument();
      expect(screen.getByText("10:00 - 11:00")).toBeInTheDocument();
    });

    it("should display client name when available", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The client name should be displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should handle missing client data gracefully", () => {
      // Given: Client data is not available
      vi.mocked(useClient).mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should render without client name
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  describe("Cancel Functionality", () => {
    it("should call onCancelSession when remove button is clicked", () => {
      // Given: Client data is available and cancel function is mocked
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);
      const mockCancelFunction = vi.fn();

      // When: The component is rendered and remove button is clicked
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockCancelFunction}
        />
      );

      const removeButton = screen.getByTestId("remove-session-session-1");
      fireEvent.click(removeButton);

      // Then: The cancel function should be called with correct parameters
      expect(mockCancelFunction).toHaveBeenCalledWith("session-1", 1);
    });

    it("should have correct aria-label for remove button", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The remove button should have the correct aria-label
      const removeButton = screen.getByTestId("remove-session-session-1");
      expect(removeButton).toHaveAttribute("aria-label");
      expect(removeButton.getAttribute("aria-label")).toContain(
        "Cancel session with John Doe on 01/15/2024 10:00"
      );
    });

    it("should handle aria-label when client name is not available", () => {
      // Given: Client data is not available
      vi.mocked(useClient).mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The remove button should still have an aria-label
      const removeButton = screen.getByTestId("remove-session-session-1");
      expect(removeButton).toHaveAttribute("aria-label");
      expect(removeButton.getAttribute("aria-label")).toContain(
        "Cancel session with undefined on 01/15/2024 10:00"
      );
    });
  });

  describe("Component Structure", () => {
    it("should render the row with correct test ID", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The row should be rendered with correct test ID
      expect(screen.getByTestId("session-row-session-1")).toBeInTheDocument();
    });

    it("should render remove button with correct styling", () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The remove button should have correct styling classes
      const removeButton = screen.getByTestId("remove-session-session-1");
      expect(removeButton).toHaveClass("min-h-[36px]", "touch-manipulation");
    });

    it('should display "Remove" text on button', () => {
      // Given: Client data is available
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The button should display "Remove" text
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
  });

  describe("Hook Integration", () => {
    it("should call useClient with correct client ID", () => {
      // Given: The component is about to be rendered
      vi.mocked(useClient).mockReturnValue({
        data: mockClient,
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: useClient should be called with the correct client ID
      expect(useClient).toHaveBeenCalledWith(1);
    });

    it("should handle loading state", () => {
      // Given: Client data is loading
      vi.mocked(useClient).mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should render without client name
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });

    it("should handle error state", () => {
      // Given: Client data has an error
      vi.mocked(useClient).mockReturnValue({
        data: null,
        isLoading: false,
        error: new Error("Failed to load client"),
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should render without client name
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle different date formats correctly", () => {
      // Given: A session with different date
      const differentSession: BookedAppointment = {
        id: "session-2",
        from: new Date("2024-12-25T15:30:00"),
        to: new Date("2024-12-25T16:30:00"),
        clientId: 2,
      };

      vi.mocked(useClient).mockReturnValue({
        data: { id: 2, name: "Jane Smith" },
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={differentSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The date should be formatted correctly
      expect(screen.getByText("12/25/2024")).toBeInTheDocument();
      expect(screen.getByText("15:30 - 16:30")).toBeInTheDocument();
    });

    it("should handle empty client name", () => {
      // Given: Client data with empty name
      vi.mocked(useClient).mockReturnValue({
        data: { id: 1, name: "" },
        isLoading: false,
        error: null,
      } as any);

      // When: The component is rendered
      render(
        <UpcomingSessionsRow
          session={mockSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should handle empty name gracefully
      const removeButton = screen.getByTestId("remove-session-session-1");
      expect(removeButton.getAttribute("aria-label")).toContain(
        "Cancel session with  on 01/15/2024 10:00"
      );
    });
  });
});
