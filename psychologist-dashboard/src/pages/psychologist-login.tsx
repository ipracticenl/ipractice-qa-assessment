import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreatePsychologist,
  usePsychologistByName,
} from "@/lib/api/hooks/use-psychologist";
import { useAllClients } from "@/lib/api/hooks/use-client";
import { useUser } from "@/lib/context";
import { MultiSelectOption } from "@/components/multi-select";
import { AuthCard } from "@/components/auth-card";

export const PsychologistLoginPage: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [triggeredPsychologistName, setTriggeredPsychologistName] = useState<
    string | undefined
  >(undefined);
  const [showCreate, setShowCreate] = useState(false);
  const { data: psychologist, error: psychologistError } =
    usePsychologistByName(triggeredPsychologistName);
  const { setCurrentUser } = useUser();
  const { mutateAsync } = useCreatePsychologist();
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const { data: clients } = useAllClients(showCreate);

  const handleLogin = () => {
    if (showCreate) {
      handleCreate();
    } else {
      if (!name.trim()) return;
      setTriggeredPsychologistName(name);
    }
  };

  const handleBack = () => {
    if (showCreate) {
      setShowCreate(false);
    } else {
      navigate("/");
    }
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    mutateAsync({
      name,
      initialClients: selectedClients.length > 0 ? selectedClients : [],
    }).then((psychologist) => {
      setCurrentUser({
        id: psychologist.id,
        name: psychologist.name,
        type: "psychologist",
      });
    });
  };

  useEffect(() => {
    if (psychologist) {
      setCurrentUser({
        id: psychologist.id,
        name: psychologist.name,
        type: "psychologist",
      });
      navigate(`/psychologist`);
    }
  }, [psychologist]);

  useEffect(() => {
    if (psychologistError) {
      psychologistError.toString().includes("not found")
        ? setShowCreate(true)
        : console.error(psychologistError);
    }
  }, [psychologistError]);

  return (
    <AuthCard
      registerFlow={showCreate}
      options={clients as MultiSelectOption[]}
      title="Psychologist Login"
      description="Enter your name to login"
      registrationTitle="Create Psychologist"
      registrationDescription="Enter your name and select your clients"
      selectLabel="Select Clients"
      selectPlaceholder="Select Clients"
      name={name}
      setName={setName}
      selectedOptions={selectedClients}
      setSelectedOptions={setSelectedClients}
      handleLogin={handleLogin}
      handleBack={handleBack}
    />
  );
};
