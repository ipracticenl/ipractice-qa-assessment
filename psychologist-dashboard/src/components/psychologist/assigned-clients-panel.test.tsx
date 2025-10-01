import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AssignedClientsPanel } from "./assigned-clients-panel";
import { ClientSummaryDto } from "@/types";

// Mock data
const mockClients: ClientSummaryDto[] = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
  },
  {
    id: 3,
    name: "Bob Johnson",
  },
];

describe("AssignedClientsPanel", () => {
  describe("Snapshot Tests", () => {
    it("should match snapshot when no clients exist", () => {
      // Given: No clients are provided
      const emptyClients: ClientSummaryDto[] = [];

      // When: The component is rendered with no clients
      const { container } = render(
        <AssignedClientsPanel assignedClients={emptyClients} />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot when clients exist", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered with clients
      const { container } = render(
        <AssignedClientsPanel assignedClients={clients} />
      );

      // Then: The component should match the snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe("Empty State", () => {
    it("should display empty state message when no clients exist", () => {
      // Given: No clients are provided
      const emptyClients: ClientSummaryDto[] = [];

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={emptyClients} />);

      // Then: The empty state message should be displayed
      expect(screen.getByText("No clients assigned yet")).toBeInTheDocument();
    });

    it("should show count as 0 when no clients exist", () => {
      // Given: No clients are provided
      const emptyClients: ClientSummaryDto[] = [];

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={emptyClients} />);

      // Then: The count should be displayed as 0
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Clients Display", () => {
    it("should display clients when they exist", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: Client rows should be displayed
      expect(screen.getByTestId("client-row-1")).toBeInTheDocument();
      expect(screen.getByTestId("client-row-2")).toBeInTheDocument();
      expect(screen.getByTestId("client-row-3")).toBeInTheDocument();
    });

    it("should display client names correctly", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: Client names should be displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });

    it('should display status as "Active" for all clients', () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: All clients should show "Active" status
      const activeStatuses = screen.getAllByText("Active");
      expect(activeStatuses).toHaveLength(3);
    });

    it("should have correct aria-label for status badges", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: Status badges should have correct aria-label
      const statusBadges = screen.getAllByLabelText("Client is active");
      expect(statusBadges).toHaveLength(3);
    });

    it("should show correct count in title", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: The count should be displayed correctly
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render the main panel with correct test ID", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: The main panel should be rendered with correct test ID
      expect(screen.getByTestId("assigned-clients-panel")).toBeInTheDocument();
    });

    it("should render table headers correctly", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: The table headers should be displayed
      expect(screen.getByText("Client Name")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("should display the correct title", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={clients} />);

      // Then: The title should be displayed
      expect(screen.getByText("Assigned Clients")).toBeInTheDocument();
    });

    it("should have correct CSS classes for styling", () => {
      // Given: Clients are provided
      const clients = mockClients;

      // When: The component is rendered
      const { container } = render(
        <AssignedClientsPanel assignedClients={clients} />
      );

      // Then: The count badge should have correct styling classes
      const countBadge = container.querySelector(
        ".bg-green-100.text-green-600"
      );
      expect(countBadge).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle single client correctly", () => {
      // Given: Only one client is provided
      const singleClient = [mockClients[0]];

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={singleClient} />);

      // Then: Only one client row should be displayed
      expect(screen.getByTestId("client-row-1")).toBeInTheDocument();
      expect(screen.queryByTestId("client-row-2")).not.toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should handle large number of clients", () => {
      // Given: Many clients are provided
      const manyClients = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `Client ${index + 1}`,
      }));

      // When: The component is rendered
      render(<AssignedClientsPanel assignedClients={manyClients} />);

      // Then: All clients should be displayed
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("Client 1")).toBeInTheDocument();
      expect(screen.getByText("Client 10")).toBeInTheDocument();
    });
  });
});
