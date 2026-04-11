import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TestState {
  category: "kids" | "general" | null;
  temperamentResult: {
    counts: { choleric: number; sanguine: number; phlegmatic: number; melancholic: number };
    dominant: string;
  } | null;
  memoryResult: {
    score: number;
    total: number;
    level: string;
    counts?: {
      A: number;
      B: number;
      C: number;
    };
  } | null;
  levelResult: {
    score: number;
    total: number;
    level: string;
  } | null;
  registrationData: {
    name: string;
    phone: string;
    region: string;
    district?: string;
  } | null;
  currentStep: "category" | "level" | "temperament" | "memory" | "form" | "results";
}

interface TestContextType {
  state: TestState;
  setCategory: (category: "kids" | "general") => void;
  setTemperamentResult: (result: TestState["temperamentResult"]) => void;
  setMemoryResult: (result: TestState["memoryResult"]) => void;
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
    memoryResult: null,
    levelResult: null,
    registrationData: null,
    currentStep: "category",
  });

  const setCategory = (category: "kids" | "general") => {
    setState((prev) => ({ ...prev, category, currentStep: "level" }));
  };

  const setTemperamentResult = (result: TestState["temperamentResult"]) => {
    setState((prev) => ({ ...prev, temperamentResult: result, currentStep: "memory" }));
  };

  const setMemoryResult = (result: TestState["memoryResult"]) => {
    setState((prev) => ({ ...prev, memoryResult: result, currentStep: "form" }));
  };

  const setLevelResult = (result: TestState["levelResult"]) => {
    setState((prev) => ({ ...prev, levelResult: result, currentStep: "temperament" }));
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
      memoryResult: null,
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
        setMemoryResult,
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
