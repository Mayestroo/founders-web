"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTestContext } from "@/context/TestContext";
import { useRouter } from "next/router";

const CHOLERIC = "choleric";
const SANGUINE = "sanguine";
const PHLEGMATIC = "phlegmatic";
const MELANCHOLIC = "melancholic";
const temperamentKidsStateKey = "temperamentKidsAnswersState";

export default function TemperamentTestKids() {
  const { t, loading } = useTranslation();
  const router = useRouter();
  const { state, setTemperamentResult } = useTestContext();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const questions = [
    {
      q: t("tests.temperament_kids_q1"),
      options: [
        t("tests.temperament_kids_q1_a"),
        t("tests.temperament_kids_q1_b"),
        t("tests.temperament_kids_q1_c"),
        t("tests.temperament_kids_q1_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q2"),
      options: [
        t("tests.temperament_kids_q2_a"),
        t("tests.temperament_kids_q2_b"),
        t("tests.temperament_kids_q2_c"),
        t("tests.temperament_kids_q2_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q3"),
      options: [
        t("tests.temperament_kids_q3_a"),
        t("tests.temperament_kids_q3_b"),
        t("tests.temperament_kids_q3_c"),
        t("tests.temperament_kids_q3_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q4"),
      options: [
        t("tests.temperament_kids_q4_a"),
        t("tests.temperament_kids_q4_b"),
        t("tests.temperament_kids_q4_c"),
        t("tests.temperament_kids_q4_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q5"),
      options: [
        t("tests.temperament_kids_q5_a"),
        t("tests.temperament_kids_q5_b"),
        t("tests.temperament_kids_q5_c"),
        t("tests.temperament_kids_q5_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q6"),
      options: [
        t("tests.temperament_kids_q6_a"),
        t("tests.temperament_kids_q6_b"),
        t("tests.temperament_kids_q6_c"),
        t("tests.temperament_kids_q6_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q7"),
      options: [
        t("tests.temperament_kids_q7_a"),
        t("tests.temperament_kids_q7_b"),
        t("tests.temperament_kids_q7_c"),
        t("tests.temperament_kids_q7_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q8"),
      options: [
        t("tests.temperament_kids_q8_a"),
        t("tests.temperament_kids_q8_b"),
        t("tests.temperament_kids_q8_c"),
        t("tests.temperament_kids_q8_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q9"),
      options: [
        t("tests.temperament_kids_q9_a"),
        t("tests.temperament_kids_q9_b"),
        t("tests.temperament_kids_q9_c"),
        t("tests.temperament_kids_q9_d"),
      ],
    },
    {
      q: t("tests.temperament_kids_q10"),
      options: [
        t("tests.temperament_kids_q10_a"),
        t("tests.temperament_kids_q10_b"),
        t("tests.temperament_kids_q10_c"),
        t("tests.temperament_kids_q10_d"),
      ],
    },
  ];

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [incomplete, setIncomplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(temperamentKidsStateKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: Array<number | null>;
        showResult?: boolean;
      };

      if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
        setAnswers(parsed.answers);
      }

      if (parsed.showResult) {
        setShowResult(true);
        const savedResult = localStorage.getItem("temperamentResult");
        if (savedResult) {
          setTemperamentResult(JSON.parse(savedResult));
        }
      }
    } catch {
      localStorage.removeItem(temperamentKidsStateKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      temperamentKidsStateKey,
      JSON.stringify({
        answers,
        showResult,
      })
    );
  }, [answers, showResult]);

  if (loading) {
    return <div className="text-center py-12">{t("common.loading")}</div>;
  }

  const mapIndexToType = (oi: number): string => {
    if (oi === 0) return CHOLERIC;
    if (oi === 1) return SANGUINE;
    if (oi === 2) return PHLEGMATIC;
    return MELANCHOLIC;
  };

  const handleSelect = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some((a) => a === null)) {
      setIncomplete(true);
      const firstIdx = answers.findIndex((a) => a === null);
      const el = questionRefs.current[firstIdx];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setIncomplete(false);

    const counts = answers.reduce(
      (acc, ans) => {
        if (ans !== null) {
          const k = mapIndexToType(ans);
          acc[k as keyof typeof acc] += 1;
        }
        return acc;
      },
      { [CHOLERIC]: 0, [SANGUINE]: 0, [PHLEGMATIC]: 0, [MELANCHOLIC]: 0 }
    );

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    const result = { counts, dominant };
    setShowResult(true);

    // Save to context and localStorage
    localStorage.setItem("temperamentResult", JSON.stringify(result));
    setTemperamentResult(result as any);
  };

  const handleContinue = () => {
    router.push("/tests/iq-kids");
  };

  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("tests.temperament_done")}
          </h2>
          <p className="mb-6 max-w-3xl text-center text-lg font-medium text-gray-700">
            {t("tests.temperament_next_notice")}
          </p>

          <button
            onClick={handleContinue}
            className="w-auto m-auto mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            {t("common.next")}
          </button>
        </div>
      </div>
    );
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
        {questions.map((q, qi) => (
          <div
            key={qi}
            ref={(el) => {
              questionRefs.current[qi] = el;
            }}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {qi + 1}. {q.q}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    checked={answers[qi] === oi}
                    onChange={() => handleSelect(qi, oi)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {incomplete && (
          <p className="text-red-600 text-sm mb-2">{t("tests.incomplete_warning")}</p>
        )}
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
