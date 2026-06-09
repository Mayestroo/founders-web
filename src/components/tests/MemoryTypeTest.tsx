"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTestContext } from "@/context/TestContext";
import { useTranslation } from "@/hooks/useTranslation";

type MemoryOption = "A" | "B" | "C";

type MemoryQuestion = {
  question: string;
  options: Array<{
    key: MemoryOption;
    text: string;
  }>;
};

type StoredMemoryResult = {
  score: number;
  total: number;
  level: string;
  counts?: Record<MemoryOption, number>;
};

type MemoryTypeTestProps = {
  answersStateKey: string;
  resultStorageKey: string;
  nextPath: string;
};

const MEMORY_QUESTION_COUNT = 10;

const buildMemoryQuestions = (t: (key: string) => string): MemoryQuestion[] => [
  {
    question: t("tests.memory_q1"),
    options: [
      { key: "A", text: t("tests.memory_q1_a") },
      { key: "B", text: t("tests.memory_q1_b") },
      { key: "C", text: t("tests.memory_q1_c") },
    ],
  },
  {
    question: t("tests.memory_q2"),
    options: [
      { key: "A", text: t("tests.memory_q2_a") },
      { key: "B", text: t("tests.memory_q2_b") },
      { key: "C", text: t("tests.memory_q2_c") },
    ],
  },
  {
    question: t("tests.memory_q3"),
    options: [
      { key: "A", text: t("tests.memory_q3_a") },
      { key: "B", text: t("tests.memory_q3_b") },
      { key: "C", text: t("tests.memory_q3_c") },
    ],
  },
  {
    question: t("tests.memory_q4"),
    options: [
      { key: "A", text: t("tests.memory_q4_a") },
      { key: "B", text: t("tests.memory_q4_b") },
      { key: "C", text: t("tests.memory_q4_c") },
    ],
  },
  {
    question: t("tests.memory_q5"),
    options: [
      { key: "A", text: t("tests.memory_q5_a") },
      { key: "B", text: t("tests.memory_q5_b") },
      { key: "C", text: t("tests.memory_q5_c") },
    ],
  },
  {
    question: t("tests.memory_q6"),
    options: [
      { key: "A", text: t("tests.memory_q6_a") },
      { key: "B", text: t("tests.memory_q6_b") },
      { key: "C", text: t("tests.memory_q6_c") },
    ],
  },
  {
    question: t("tests.memory_q7"),
    options: [
      { key: "A", text: t("tests.memory_q7_a") },
      { key: "B", text: t("tests.memory_q7_b") },
      { key: "C", text: t("tests.memory_q7_c") },
    ],
  },
  {
    question: t("tests.memory_q8"),
    options: [
      { key: "A", text: t("tests.memory_q8_a") },
      { key: "B", text: t("tests.memory_q8_b") },
      { key: "C", text: t("tests.memory_q8_c") },
    ],
  },
  {
    question: t("tests.memory_q9"),
    options: [
      { key: "A", text: t("tests.memory_q9_a") },
      { key: "B", text: t("tests.memory_q9_b") },
      { key: "C", text: t("tests.memory_q9_c") },
    ],
  },
  {
    question: t("tests.memory_q10"),
    options: [
      { key: "A", text: t("tests.memory_q10_a") },
      { key: "B", text: t("tests.memory_q10_b") },
      { key: "C", text: t("tests.memory_q10_c") },
    ],
  },
];

const buildMemoryStyles = (t: (key: string) => string): Record<MemoryOption, { title: string; description: string }> => ({
  A: {
    title: t("tests.memory_style_visual_title"),
    description: t("tests.memory_style_visual_description"),
  },
  B: {
    title: t("tests.memory_style_audial_title"),
    description: t("tests.memory_style_audial_description"),
  },
  C: {
    title: t("tests.memory_style_kinesthetic_title"),
    description: t("tests.memory_style_kinesthetic_description"),
  },
});

const createEmptyCounts = (): Record<MemoryOption, number> => ({
  A: 0,
  B: 0,
  C: 0,
});

const countAnswers = (answers: Array<MemoryOption | null>): Record<MemoryOption, number> => {
  const counts = createEmptyCounts();
  answers.forEach((answer) => {
    if (answer) {
      counts[answer] += 1;
    }
  });
  return counts;
};

const getDominantOption = (counts: Record<MemoryOption, number>): MemoryOption => {
  const order: MemoryOption[] = ["A", "B", "C"];
  return order.reduce<MemoryOption>((best, current) => (counts[current] > counts[best] ? current : best), "A");
};

export default function MemoryTypeTest({
  answersStateKey,
  resultStorageKey,
  nextPath,
}: MemoryTypeTestProps) {
  const router = useRouter();
  const { setMemoryResult } = useTestContext();
  const { t } = useTranslation();

  const memoryTestTitle = t("common.memory_test");
  const memoryTestInstruction = t("tests.memory_instruction");
  const memoryQuestions = buildMemoryQuestions(t);
  const memoryStyles = buildMemoryStyles(t);

  const [answers, setAnswers] = useState<Array<MemoryOption | null>>(Array(MEMORY_QUESTION_COUNT).fill(null));
  const [warning, setWarning] = useState("");
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const savedState = localStorage.getItem(answersStateKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as {
          answers?: Array<MemoryOption | null>;
        };

        if (Array.isArray(parsed.answers) && parsed.answers.length === MEMORY_QUESTION_COUNT) {
          setAnswers(parsed.answers);
        }
      } catch {
        localStorage.removeItem(answersStateKey);
      }
    }
  }, [answersStateKey]);

  useEffect(() => {
    localStorage.setItem(
      answersStateKey,
      JSON.stringify({
        answers,
      }),
    );
  }, [answers, answersStateKey]);

  const handleSelect = (questionIndex: number, option: MemoryOption) => {
    const next = [...answers];
    next[questionIndex] = option;
    setAnswers(next);
    setWarning("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstUnanswered = answers.findIndex((answer) => answer === null);
    if (firstUnanswered !== -1) {
      setWarning(t("tests.incomplete_warning"));
      const element = questionRefs.current[firstUnanswered];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const calculatedCounts = countAnswers(answers);
    const dominantOption = getDominantOption(calculatedCounts);
    const style = memoryStyles[dominantOption];

    const resultPayload: StoredMemoryResult = {
      score: calculatedCounts[dominantOption],
      total: memoryQuestions.length,
      level: style.title,
      counts: calculatedCounts,
    };

    localStorage.setItem(resultStorageKey, JSON.stringify(resultPayload));
    setMemoryResult({
      score: resultPayload.score,
      total: resultPayload.total,
      level: resultPayload.level,
      counts: resultPayload.counts,
    });

    router.push(nextPath);
  };

  return (
    <div
      className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white"
      style={{ boxShadow: "15px 15px 40px 0px #FF00004D" }}
    >
      <h1 className="text-2xl font-bold mb-1">
        {memoryTestTitle}
      </h1>
      <p className="text-sm text-red-600 mb-2">{memoryTestInstruction}</p>

      {warning && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{warning}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {memoryQuestions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            ref={(element) => {
              questionRefs.current[questionIndex] = element;
            }}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option) => (
                <label key={option.key} className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`memory-q-${questionIndex}`}
                    checked={answers[questionIndex] === option.key}
                    onChange={() => handleSelect(questionIndex, option.key)}
                    className="mt-1"
                  />
                  <span>
                    {option.key}) {option.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          {t("common.next")}
        </button>
      </form>
    </div>
  );
}
