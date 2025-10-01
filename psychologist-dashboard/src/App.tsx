import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "@/pages/landing-page";
import { PsychologistDashboard } from "@/pages/psychologist-dashboard";
import { ClientDashboard } from "@/pages/client-dashboard";
import { ClientLoginPage } from "@/pages/client-login";
import { useUser } from "@/lib/context";
import { PsychologistLoginPage } from "@/pages/psychologist-login";

export default function App() {
  const { currentUser } = useUser();

  // Set up proper focus management and announcements
  useEffect(() => {
    if (currentUser) {
      // Announce page change to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Logged in as ${currentUser.name}. ${
        currentUser.type === "psychologist" ? "Psychologist" : "Client"
      } dashboard loaded.`;
      document.body.appendChild(announcement);

      // Clean up announcement after screen reader has time to read it
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [currentUser]);

  // Skip to main content link for keyboard users
  const skipToMain = () => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
    }
  };

  return (
    <div className="min-h-screen" data-testid="app-container">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
      >
        Skip to main content
      </a>

      <Routes>
        <Route
          path="/"
          element={
            !currentUser ? (
              <LandingPage />
            ) : (
              <Navigate
                to={
                  currentUser.type === "psychologist"
                    ? "/psychologist"
                    : "/client"
                }
                replace
              />
            )
          }
        />
        <Route path="/auth-psychologist" element={<PsychologistLoginPage />} />
        <Route path="/auth-client" element={<ClientLoginPage />} />
        <Route
          path="/psychologist"
          element={
            currentUser?.type === "psychologist" ? (
              <PsychologistDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/client"
          element={
            currentUser?.type === "client" ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}
