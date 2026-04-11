"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTestContext } from "@/context/TestContext";
import { useTranslation } from "@/hooks/useTranslation";

const CHOLERIC = "choleric";
const SANGUINE = "sanguine";
const PHLEGMATIC = "phlegmatic";
const MELANCHOLIC = "melancholic";

type TemperamentType = typeof CHOLERIC | typeof SANGUINE | typeof PHLEGMATIC | typeof MELANCHOLIC;

type TemperamentResult = {
  counts: Record<TemperamentType, number>;
  dominant: TemperamentType;
};

type Question = {
  q: string;
  options: string[];
};

type TemperamentTestUnifiedProps = {
  answersStateKey: string;
  resultStorageKey: string;
  nextPath: string;
};

const buildTemperamentQuestions = (t: (key: string) => string): Question[] => [
  {
    q: t("tests.temperament_unified_q1"),
    options: [
      t("tests.temperament_unified_q1_a"),
      t("tests.temperament_unified_q1_b"),
      t("tests.temperament_unified_q1_v"),
      t("tests.temperament_unified_q1_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q2"),
    options: [
      t("tests.temperament_unified_q2_a"),
      t("tests.temperament_unified_q2_b"),
      t("tests.temperament_unified_q2_v"),
      t("tests.temperament_unified_q2_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q3"),
    options: [
      t("tests.temperament_unified_q3_a"),
      t("tests.temperament_unified_q3_b"),
      t("tests.temperament_unified_q3_v"),
      t("tests.temperament_unified_q3_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q4"),
    options: [
      t("tests.temperament_unified_q4_a"),
      t("tests.temperament_unified_q4_b"),
      t("tests.temperament_unified_q4_v"),
      t("tests.temperament_unified_q4_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q5"),
    options: [
      t("tests.temperament_unified_q5_a"),
      t("tests.temperament_unified_q5_b"),
      t("tests.temperament_unified_q5_v"),
      t("tests.temperament_unified_q5_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q6"),
    options: [
      t("tests.temperament_unified_q6_a"),
      t("tests.temperament_unified_q6_b"),
      t("tests.temperament_unified_q6_v"),
      t("tests.temperament_unified_q6_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q7"),
    options: [
      t("tests.temperament_unified_q7_a"),
      t("tests.temperament_unified_q7_b"),
      t("tests.temperament_unified_q7_v"),
      t("tests.temperament_unified_q7_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q8"),
    options: [
      t("tests.temperament_unified_q8_a"),
      t("tests.temperament_unified_q8_b"),
      t("tests.temperament_unified_q8_v"),
      t("tests.temperament_unified_q8_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q9"),
    options: [
      t("tests.temperament_unified_q9_a"),
      t("tests.temperament_unified_q9_b"),
      t("tests.temperament_unified_q9_v"),
      t("tests.temperament_unified_q9_g"),
    ],
  },
  {
    q: t("tests.temperament_unified_q10"),
    options: [
      t("tests.temperament_unified_q10_a"),
      t("tests.temperament_unified_q10_b"),
      t("tests.temperament_unified_q10_v"),
      t("tests.temperament_unified_q10_g"),
    ],
  },
];

const labelByOptionIndex: Record<number, TemperamentType> = {
  0: CHOLERIC,
  1: SANGUINE,
  2: PHLEGMATIC,
  3: MELANCHOLIC,
};

export default function TemperamentTestUnified({
  answersStateKey,
  resultStorageKey,
  nextPath,
}: TemperamentTestUnifiedProps) {
  const router = useRouter();
  const { setTemperamentResult } = useTestContext();
  const { t, loading } = useTranslation();
  const questions = buildTemperamentQuestions(t);

  const [answers, setAnswers] = useState<Array<number | null>>(Array(10).fill(null));
  const [incomplete, setIncomplete] = useState(false);
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const saved = localStorage.getItem(answersStateKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          answers?: Array<number | null>;
        };

        if (Array.isArray(parsed.answers) && parsed.answers.length === 10) {
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

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    const next = [...answers];
    next[questionIndex] = optionIndex;
    setAnswers(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstUnanswered = answers.findIndex((answer) => answer === null);
    if (firstUnanswered !== -1) {
      setIncomplete(true);
      const element = questionRefs.current[firstUnanswered];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIncomplete(false);

    const counts = answers.reduce(
      (acc, answer) => {
        const type = labelByOptionIndex[answer as number];
        acc[type] += 1;
        return acc;
      },
      {
        [CHOLERIC]: 0,
        [SANGUINE]: 0,
        [PHLEGMATIC]: 0,
        [MELANCHOLIC]: 0,
      } as Record<TemperamentType, number>,
    );

    const dominant = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] || CHOLERIC) as TemperamentType;
    const result: TemperamentResult = { counts, dominant };

    setTemperamentResult(result);
    localStorage.setItem(resultStorageKey, JSON.stringify(result));
    router.push(nextPath);
  };

  if (loading) {
    return <div className="text-center py-12">{t("common.loading")}</div>;
  }

  return (
    <div
      className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white"
      style={{ boxShadow: "15px 15px 40px 0px #FF00004D" }}
    >
      <p className="text-sm text-gray-700 mb-2">{t("tests.category_selection")}</p>
      <h1 className="text-2xl font-bold mb-1">{t("common.temperament_test")}</h1>
      <p className="text-sm text-red-600 mb-6">{t("tests.temperament_instruction")}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            ref={(element) => {
              questionRefs.current[questionIndex] = element;
            }}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {questionIndex + 1}. {question.q}
            </p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${questionIndex}`}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() => handleSelect(questionIndex, optionIndex)}
                    className="mt-1"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {incomplete && <p className="text-red-600 text-sm mb-2">{t("tests.incomplete_warning")}</p>}

        <button
          type="submit"
          className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
        >
          {t("common.next")}
        </button>
      </form>
    </div>
  );
}
