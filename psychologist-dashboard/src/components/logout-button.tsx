import { useUser } from "@/lib/context";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const onLogout = () => {
    setCurrentUser(null);
    navigate(-1);
    // Announce logout to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent =
      "Logged out successfully. Returning to login page.";
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <Button
      onClick={onLogout}
      variant="outline"
      className="min-h-[44px] touch-manipulation bg-transparent"
      data-testid="client-logout-button"
      aria-label="Log out of dashboard"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};
