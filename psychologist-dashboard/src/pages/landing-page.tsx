import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const LandingPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md" data-testid="user-type-selection">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl">Welcome</CardTitle>
          <CardDescription className="text-base">
            Please select your account type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => navigate("auth-psychologist")}
            className="w-full h-16 text-lg touch-manipulation"
            variant="outline"
            data-testid="psychologist-option"
            aria-describedby="psychologist-description"
          >
            I'm a Psychologist
          </Button>
          <div id="psychologist-description" className="sr-only">
            Select this option if you are a mental health professional
          </div>

          <Button
            onClick={() => navigate("auth-client")}
            className="w-full h-16 text-lg touch-manipulation"
            variant="outline"
            data-testid="client-option"
            aria-describedby="client-description"
          >
            I'm a Client
          </Button>
          <div id="client-description" className="sr-only">
            Select this option if you are seeking mental health services
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
