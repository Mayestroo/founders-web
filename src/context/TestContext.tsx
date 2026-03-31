import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TestState {
  category: "kids" | "general" | null;
  temperamentResult: {
    counts: { choleric: number; sanguine: number; phlegmatic: number; melancholic: number };
    dominant: string;
  } | null;
  iqResult: {
    score: number;
    total: number;
    level: string;
  } | null;
  levelResult: {
    score: number;
    total: number;
    level: string;
  } | null;
  registrationData: {
    name: string;
    birthdate: string;
    phone: string;
    heard: string;
    problem: string;
    region: string;
    district?: string;
  } | null;
  currentStep: "category" | "temperament" | "iq" | "level" | "form" | "results";
}

interface TestContextType {
  state: TestState;
  setCategory: (category: "kids" | "general") => void;
  setTemperamentResult: (result: TestState["temperamentResult"]) => void;
  setIQResult: (result: TestState["iqResult"]) => void;
  setLevelResult: (result: TestState["levelResult"]) => void;
  setRegistrationData: (data: TestState["registrationData"]) => void;
  setCurrentStep: (step: TestState["currentStep"]) => void;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TestState>({
    category: null,
    temperamentResult: null,
    iqResult: null,
    levelResult: null,
    registrationData: null,
    currentStep: "category",
  });

  const setCategory = (category: "kids" | "general") => {
    setState((prev) => ({ ...prev, category, currentStep: "temperament" }));
  };

  const setTemperamentResult = (result: TestState["temperamentResult"]) => {
    setState((prev) => ({ ...prev, temperamentResult: result, currentStep: "iq" }));
  };

  const setIQResult = (result: TestState["iqResult"]) => {
    setState((prev) => ({ ...prev, iqResult: result, currentStep: "level" }));
  };

  const setLevelResult = (result: TestState["levelResult"]) => {
    setState((prev) => ({ ...prev, levelResult: result, currentStep: "form" }));
  };

  const setRegistrationData = (data: TestState["registrationData"]) => {
    setState((prev) => ({ ...prev, registrationData: data, currentStep: "results" }));
  };

  const setCurrentStep = (step: TestState["currentStep"]) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const resetTest = () => {
    setState({
      category: null,
      temperamentResult: null,
      iqResult: null,
      levelResult: null,
      registrationData: null,
      currentStep: "category",
    });
  };

  return (
    <TestContext.Provider
      value={{
        state,
        setCategory,
        setTemperamentResult,
        setIQResult,
        setLevelResult,
        setRegistrationData,
        setCurrentStep,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTestContext must be used within TestProvider");
  }
  return context;
};
