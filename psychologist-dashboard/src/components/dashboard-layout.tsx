import type { FC, PropsWithChildren } from "react";
import { DashboardHeader } from "./dashboard-header";

interface DashboardLayoutProps {
  title: string;
}

export const DashboardLayout: FC<PropsWithChildren<DashboardLayoutProps>> = ({
  children,
  title,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title={title} />

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {children}
        </div>
      </main>
    </div>
  );
};
