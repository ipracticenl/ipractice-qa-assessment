import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import { MultiSelect, MultiSelectOption } from "./multi-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AuthCardProps {
  registerFlow: boolean;
  options: MultiSelectOption[];
  title: string;
  description: string;
  registrationTitle: string;
  registrationDescription: string;
  selectLabel: string;
  selectPlaceholder: string;
  name: string;
  setName: (name: string) => void;
  selectedOptions: number[];
  setSelectedOptions: (options: number[]) => void;
  handleLogin: () => void;
  handleBack: () => void;
}

export const AuthCard = ({
  registerFlow,
  options,
  title,
  description,
  registrationTitle,
  registrationDescription,
  selectLabel,
  selectPlaceholder,
  name,
  setName,
  selectedOptions,
  setSelectedOptions,
  handleLogin,
  handleBack,
}: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md" data-testid="login-form">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            {registerFlow ? registrationTitle : title}
          </CardTitle>
          <CardDescription>
            {registerFlow ? registrationDescription : description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-base">
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 min-h-[44px]"
              aria-required="true"
            />
          </div>
          {registerFlow && options && (
            <div>
              <Label htmlFor="options-select" className="text-base">
                {selectLabel}
              </Label>
              <MultiSelect
                options={options}
                onValueChange={setSelectedOptions}
                defaultValue={selectedOptions}
                placeholder={selectPlaceholder}
                id="options-select"
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleLogin}
              className="flex-1 min-h-[44px] touch-manipulation"
              disabled={!name.trim()}
              data-testid="login-button"
            >
              {registerFlow ? "Create" : "Login"}
            </Button>
            <Button
              onClick={handleBack}
              variant="outline"
              className="min-h-[44px] touch-manipulation"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
