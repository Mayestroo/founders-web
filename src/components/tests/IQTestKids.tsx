"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTestContext } from "@/context/TestContext";
import { useRouter } from "next/router";
const iqKidsStateKey = "iqKidsAnswersState";

// Shape components
const Square = ({
  size = 16,
  color = "#000",
  filled = false,
  className = "",
}: {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
}) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      backgroundColor: filled ? color : "transparent",
      border: `2px solid ${color}`,
      boxSizing: "border-box",
    }}
  />
);

const Circle = ({
  size = 16,
  color = "#000",
  filled = true,
  className = "",
}: {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
}) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: filled ? color : "transparent",
      border: `2px solid ${color}`,
      boxSizing: "border-box",
    }}
  />
);

const Triangle = ({
  size = 12,
  color = "#EC0000",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.6}px solid ${color}`,
    }}
  />
);

export default function IQTestKids() {
  const { t, loading } = useTranslation();
  const router = useRouter();
  const { state, setIQResult } = useTestContext();

  const questions: Array<{
    q: string | React.ReactNode;
    options: (string | React.ReactNode)[];
    correct: number;
  }> = [
    {
      q: "3, 6, 9, 12, —?",
      options: ["A) 13", "B) 14", "C) 15", "D) 18"],
      correct: 2,
    },
     {
       q: (
         <div>
           <div className="font-medium mb-2">(Shakl/Naqsh)</div>
           <div className="flex items-center gap-2 flex-wrap">
             <Square color="#000" />
             <Square color="#000" filled />
             <Square color="#000" />
             <Square color="#000" filled />
             <Square color="#000" />
             <Square color="#000" filled />
             <Square color="#000" />
             <Square color="#000" filled />
             <span className="inline-block w-6 h-[2px] bg-black align-middle" />
           </div>
           <div className="text-sm text-gray-600 mt-1">Qaysi belgi ketishi kerak?</div>
         </div>
       ),
       options: [
         <span key="a" className="flex items-center gap-2">
           <span className="mr-1">A)</span>
           <Square color="#000" />
         </span>,
         <span key="b" className="flex items-center gap-2">
           <span className="mr-1">B)</span>
           <Square color="#000" filled />
         </span>,
         <span key="c" className="flex items-center gap-2">
           <span className="mr-1">C)</span>
           <Triangle color="#EC0000" />
         </span>,
         <span key="d" className="flex items-center gap-2">
           <span className="mr-1">D)</span>
           <Circle color="#000" />
         </span>,
       ],
       correct: 1,
     },
    {
      q: "Barcha qushlar uchadi. Pingvin uchmaydi. Demak pingvin...",
      options: [
        "A) qush emas",
        "B) albatta uchadi",
        "C) qush, lekin istisno",
        "D) hayvon emas",
      ],
      correct: 2,
    },
    {
      q: "Qatorni diqqat bilan o'qi va faqat 'A' harflarining sonini sanang: A A B A C D E F A a A a",
      options: ["A) 4", "B) 5", "C) 6", "D) 7"],
      correct: 2,
    },
    {
      q: "12 − 4 × 2 = ?",
      options: ["A) 16", "B) 8", "C) 4", "D) 20"],
      correct: 1,
    },
    {
      q: "Qanot : qush = suzgich : —?",
      options: ["A) baliq", "B) mushuk", "C) quyon", "D) daraxt"],
      correct: 0,
    },
    {
      q: "'Har bir kvadrat to'rtburchakdir.' Shundan nima kelib chiqadi?",
      options: [
        "A) Har bir to'rtburchak kvadrat",
        "B) Har qaysi kvadrat to'rtburchak emas",
        "C) Ba'zi to'rtburchaklar kvadrat",
        "D) Kvadratlar uchburchaklar kabidir",
      ],
      correct: 2,
    },
    {
      q: "1, 1, 2, 3, 5, 8, — ?",
      options: ["A) 10", "B) 11", "C) 12", "D) 13"],
      correct: 3,
    },
    {
      q: "Soatda hozir 3:40. Chorak soat o'tgach nechchi bo'ladi?",
      options: ["A) 3:55", "B) 4:00", "C) 4:10", "D) 4:20"],
      correct: 0,
    },
     {
       q: (
         <div>
           <div className="font-medium mb-2">(Shakl/Boshqacha)</div>
           <div className="flex items-center gap-3">
             <Triangle color="#EC0000" />
             <Triangle color="#1d4ed8" />
             <Square color="#1d4ed8" filled />
             <Triangle color="#EC0000" />
             <Triangle color="#EC0000" />
           </div>
           <div className="text-sm text-gray-600 mt-2">Qaysi biri boshqacha?</div>
         </div>
       ),
       options: [
         "A) 1-rasm",
         "B) 3-rasm",
         "C) 4-rasm",
         "D) 5-rasm",
       ],
       correct: 1,
     },
  ];

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(iqKidsStateKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: Array<number | null>;
        showResult?: boolean;
        score?: number;
        level?: string;
      };

      if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
        setAnswers(parsed.answers);
      }

      if (typeof parsed.score === "number") setScore(parsed.score);
      if (typeof parsed.level === "string") setLevel(parsed.level);
      if (parsed.showResult) {
        setShowResult(true);
        const savedResult = localStorage.getItem("iqKidsResult");
        if (savedResult) {
          setIQResult(JSON.parse(savedResult));
        }
      }
    } catch {
      localStorage.removeItem(iqKidsStateKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      iqKidsStateKey,
      JSON.stringify({
        answers,
        showResult,
        score,
        level,
      })
    );
  }, [answers, showResult, score, level]);

  if (loading) {
    return <div className="text-center py-12">{t("common.loading")}</div>;
  }

  const handleSelect = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    setWarning("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstUnanswered = answers.findIndex((a) => a === null);
    if (firstUnanswered !== -1) {
      setWarning(t("tests.incomplete_warning"));
      const el = document.getElementById(`iq-q-${firstUnanswered}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const calculatedScore = questions.reduce(
      (acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc),
      0
    );

    let levelKey = "";
    if (calculatedScore >= 9) {
      levelKey = "tests.very_high_level";
    } else if (calculatedScore >= 7) {
      levelKey = "tests.high_level";
    } else if (calculatedScore >= 5) {
      levelKey = "tests.average_level";
    } else {
      levelKey = "tests.practice_recommended";
    }

    setScore(calculatedScore);
    setLevel(t(levelKey));
    localStorage.setItem(
      "iqKidsResult",
      JSON.stringify({
        score: calculatedScore,
        total: questions.length,
        level: levelKey,
      })
    );
    setIQResult({
      score: calculatedScore,
      total: questions.length,
      level: levelKey,
    });

    setShowResult(true);
  };

  const handleContinue = () => {
    router.push("/tests/level-kids");
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {t("common.iq_test")} - {t("common.kids")}
        </h2>
        <div
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-8 shadow-xl"
        >
          <p className="mx-auto mb-6 max-w-3xl text-center text-lg font-medium text-gray-700">
            {t("tests.iq_done")}
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t("common.next")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white"
      style={{ boxShadow: "15px 15px 40px 0px #FF00004D" }}
    >
      <h1 className="text-2xl font-bold mb-1">
        {t("common.iq_test")} - {t("common.kids")}
      </h1>
      <p className="text-sm text-red-600 mb-2">{t("tests.iq_instruction")}</p>
      {warning && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
          {warning}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {questions.map((q, qi) => (
          <div
            id={`iq-q-${qi}`}
            key={qi}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {qi + 1}. {q.q}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className="flex items-center gap-2 cursor-pointer">
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
