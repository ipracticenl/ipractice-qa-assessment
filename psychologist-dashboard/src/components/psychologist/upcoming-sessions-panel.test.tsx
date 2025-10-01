import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UpcomingSessionsPanel } from "./upcoming-sessions-panel";
import { BookedAppointment } from "@/types";

// Mock the UpcomingSessionsRow component
vi.mock("./upcoming-sessions-row", () => ({
  UpcomingSessionsRow: ({ session, onCancelSession }: any) => (
    <div data-testid={`session-row-${session.id}`}>
      <span>Session {session.id}</span>
      <button onClick={() => onCancelSession(session.id, session.clientId)}>
        Cancel
      </button>
    </div>
  ),
}));

// Mock data
const mockSessions: BookedAppointment[] = [
  {
    id: "session-1",
    from: new Date("2024-01-15T10:00:00"),
    to: new Date("2024-01-15T11:00:00"),
    clientId: 1,
  },
  {
    id: "session-2",
    from: new Date("2024-01-16T14:00:00"),
    to: new Date("2024-01-16T15:00:00"),
    clientId: 2,
  },
];

describe("UpcomingSessionsPanel", () => {
  const mockOnCancelSession = vi.fn();

  describe("Snapshot Tests", () => {
    it("should match snapshot when no sessions exist", () => {
      // Given: No sessions are provided
      const emptySessions: BookedAppointment[] = [];

      // When: The component is rendered with no sessions
      const { container } = render(
        <UpcomingSessionsPanel
          bookedSessions={emptySessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when sessions exist", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered with sessions
      const { container } = render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Empty State", () => {
    it("should display empty state message when no sessions exist", () => {
      // Given: No sessions are provided
      const emptySessions: BookedAppointment[] = [];

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={emptySessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The empty state message should be displayed
      expect(
        screen.getByText("No upcoming sessions scheduled")
      ).toBeInTheDocument();
    });

    it("should show count as 0 when no sessions exist", () => {
      // Given: No sessions are provided
      const emptySessions: BookedAppointment[] = [];

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={emptySessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The count should be displayed as 0
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Sessions Display", () => {
    it("should display sessions when they exist", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: Session rows should be displayed
      expect(screen.getByTestId("session-row-session-1")).toBeInTheDocument();
      expect(screen.getByTestId("session-row-session-2")).toBeInTheDocument();
    });

    it("should show correct count in title", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The count should be displayed correctly
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should pass correct props to UpcomingSessionsRow components", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The mocked row components should be rendered with session data
      expect(screen.getByText("Session session-1")).toBeInTheDocument();
      expect(screen.getByText("Session session-2")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("upcoming-sessions-panel")).toBeInTheDocument();
    });

    it("should render table headers correctly", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The table headers should be displayed
      expect(screen.getByText("Date & Time")).toBeInTheDocument();
      expect(screen.getByText("Client")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The title should be displayed
      expect(screen.getByText("Upcoming Sessions")).toBeInTheDocument();
    });

    it("should have correct CSS classes for styling", () => {
      // Given: Sessions are provided
      const sessions = mockSessions;

      // When: The component is rendered
      const { container } = render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: The count badge should have correct styling classes
      const countBadge = container.querySelector(".bg-blue-100.text-blue-600");
      expect(countBadge).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle single session correctly", () => {
      // Given: Only one session is provided
      const singleSession = [mockSessions[0]];

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={singleSession}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: Only one session row should be displayed
      expect(screen.getByTestId("session-row-session-1")).toBeInTheDocument();
      expect(
        screen.queryByTestId("session-row-session-2")
      ).not.toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should handle large number of sessions", () => {
      // Given: Many sessions are provided
      const manySessions = Array.from({ length: 10 }, (_, index) => ({
        id: `session-${index + 1}`,
        from: new Date(`2024-01-${15 + index}T10:00:00`),
        to: new Date(`2024-01-${15 + index}T11:00:00`),
        clientId: index + 1,
      }));

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={manySessions}
          onCancelSession={mockOnCancelSession}
        />
      );

      // Then: All sessions should be displayed
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("Session session-1")).toBeInTheDocument();
      expect(screen.getByText("Session session-10")).toBeInTheDocument();
    });
  });

  describe("Props Validation", () => {
    it("should pass onCancelSession function to child components", () => {
      // Given: Sessions are provided and a mock cancel function
      const sessions = [mockSessions[0]];
      const mockCancelFunction = vi.fn();

      // When: The component is rendered
      render(
        <UpcomingSessionsPanel
          bookedSessions={sessions}
          onCancelSession={mockCancelFunction}
        />
      );

      // Then: The cancel button should be present and functional
      const cancelButton = screen.getByText("Cancel");
      expect(cancelButton).toBeInTheDocument();
    });
  });
});
