import { LogoutButton } from "./logout-button";
import { useUser } from "@/lib/context";

interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const { currentUser } = useUser();

  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              data-testid="client-dashboard-title"
            >
              {title}
            </h1>

            <p className="text-gray-600 mt-1">Welcome, {currentUser?.name}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
