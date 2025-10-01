import { useEffect, useState, type FC } from "react";
import { useClientByName, useCreateClient } from "@/lib/api/hooks/use-client";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/context/user-context";
import { useAllPsychologists } from "@/lib/api/hooks/use-psychologist";
import { MultiSelectOption } from "@/components/multi-select";
import { AuthCard } from "@/components/auth-card";

export const ClientLoginPage: FC = () => {
  const [name, setName] = useState("");
  const [triggeredClientName, setTriggeredClientName] = useState<
    string | undefined
  >(undefined);
  const [selectedPsychologists, setSelectedPsychologists] = useState<number[]>(
    []
  );
  const { data: client, error: clientError } =
    useClientByName(triggeredClientName);
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const [registerFlow, setRegisterFlow] = useState<boolean>(false);
  const { data: psychologists } = useAllPsychologists(registerFlow);
  const { mutateAsync } = useCreateClient();

  const handleLogin = async () => {
    if (registerFlow) {
      mutateAsync({
        name,
        initialPsychologistIds: selectedPsychologists,
      }).then((client) => {
        setCurrentUser({
          id: client.id,
          name: client.name,
          type: "client",
        });
      });
    } else {
      if (!name.trim()) return;
      setTriggeredClientName(name);
    }
  };

  const handleBack = () => {
    if (registerFlow) {
      setRegisterFlow(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (client) {
      setCurrentUser({
        id: client.id,
        name: client.name,
        type: "client",
      });
      navigate(`/client`);
    }
  }, [client]);

  useEffect(() => {
    if (clientError) {
      clientError.toString().includes("not found")
        ? setRegisterFlow(true)
        : console.error(clientError);
    }
  }, [clientError]);

  return (
    <AuthCard
      registerFlow={registerFlow}
      options={psychologists as MultiSelectOption[]}
      title="Client Login"
      description="Enter your name to login"
      registrationTitle="Create Client"
      registrationDescription="Enter your name and select your psychologists"
      selectLabel="Select Psychologists"
      selectPlaceholder="Select Psychologists"
      name={name}
      setName={setName}
      selectedOptions={selectedPsychologists}
      setSelectedOptions={setSelectedPsychologists}
      handleLogin={handleLogin}
      handleBack={handleBack}
    />
  );
};
