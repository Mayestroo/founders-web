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

const memoryQuestions: MemoryQuestion[] = [
  {
    question: "Biror ma'lumotni eslash uchun siz odatda:",
    options: [
      { key: "A", text: "U yozilgan daftarni yoki sahifani ko'z oldingizga keltirasiz." },
      { key: "B", text: "O'sha paytda eshitilgan tovush yoki so'zlarni eslaysiz." },
      { key: "C", text: "O'sha vaziyatda nima qilganingizni eslaysiz." },
    ],
  },
  {
    question: "Sizga yoqimli voqeani eslatadigan narsa:",
    options: [
      { key: "A", text: "Suratlar yoki videolar." },
      { key: "B", text: "O'sha paytda chalinar edi deb eslaydigan qo'shiq." },
      { key: "C", text: "O'sha his-tuyg'ularni yana bir bor boshdan kechirish." },
    ],
  },
  {
    question: "Film tomosha qilayotganda siz ko'proq e'tibor berasiz:",
    options: [
      { key: "A", text: "Tasvir sifati, chiroyli kadrlar." },
      { key: "B", text: "Musiqa va ovozlar, tarjima sifati." },
      { key: "C", text: "Aktyorlarning harakati va hissiyotiga." },
    ],
  },
  {
    question: "Siz uchun eng oson eslab qolish mumkin bo'lgan narsa:",
    options: [
      { key: "A", text: "Ovoz (kimningdir ovozi)." },
      { key: "B", text: "Yuzlar (odamlarning qiyofasi)." },
      { key: "C", text: "Sanalar yoki raqamlar." },
    ],
  },
  {
    question: "Maktabda siz ma'lumotni qanday eslab qolardingiz?",
    options: [
      { key: "A", text: "Shpargalka yozib." },
      { key: "B", text: "Qayta-qayta ovoz chiqarib takrorlab." },
      { key: "C", text: "O'qituvchini diqqat bilan tinglab." },
    ],
  },
  {
    question: "Kimnidir o'ylaganingizda, siz odatda:",
    options: [
      { key: "A", text: "Uning yuzini eslaysiz." },
      { key: "B", text: "Uning ovozini eslaysiz." },
      { key: "C", text: "Uning harakatlarini yoki yurish-turishini eslaysiz." },
    ],
  },
  {
    question: "Agar biror so'zni eslay olmasangiz, birinchi esingizga keladigan narsa:",
    options: [
      { key: "A", text: "So'zning ma'nosi." },
      { key: "B", text: "Birinchi harfi." },
      { key: "C", text: "So'z bilan bog'liq assotsiatsiya." },
    ],
  },
  {
    question: "Lug'atdan so'zni izlayotganda siz odatda:",
    options: [
      { key: "A", text: "Tezroq varaqlash uchun barmog'ingizni namlaysiz." },
      { key: "B", text: "So'zni og'zingizda aytmasdan, harflariga qaraysiz." },
      { key: "C", text: "So'zni baland ovozda talaffuz qilasiz." },
    ],
  },
  {
    question: "Ishlayotganingizda yoki o'qiyotganingizda atrofdagi shovqin sizga:",
    options: [
      { key: "A", text: "Umuman xalaqit bermaydi." },
      { key: "B", text: "Hatto yordam beradi, agar u yumshoq va ritmik bo'lsa." },
      { key: "C", text: "Juda halal beradi, e'tiborim chalg'iydi." },
    ],
  },
  {
    question: "Biror ma'lumotni (masalan, sana yoki qoida) eslash uchun siz:",
    options: [
      { key: "A", text: "Uni yodlayotgan paytda nima qilganingizni eslaysiz." },
      { key: "B", text: "U yozilgan qog'ozni yoki joyni ko'z oldingizga keltirasiz." },
      { key: "C", text: "Yodlayotgan paytda aytgan so'zlaringizni eslaysiz." },
    ],
  },
];

const memoryStyles: Record<MemoryOption, { title: string; description: string }> = {
  A: {
    title: "Vizual (ko'ruv orqali)",
    description:
      "Siz uchun rasm, yozuv, rang va shakl muhim. Ma'lumotni ko'rish orqali eslab qolasiz. Qog'oz, grafik, jadval va ranglar yordam beradi.",
  },
  B: {
    title: "Audial (eshitish orqali)",
    description:
      "Siz uchun tovush, ohang, ritm va nutq muhim. Ma'lumotni eshitib, muhokama qilib yoki baland ovozda o'qib yodlaysiz.",
  },
  C: {
    title: "Kinestetik (harakat va his orqali)",
    description:
      "Siz uchun tajriba, harakat va his-tuyg'u muhim. Biror narsani bajarganingizda, ushlaganingizda yoki his qilganingizda yaxshi eslab qolasiz.",
  },
};

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

  const memoryTestTitle = t("common.memory_test") || "Axborotni qabul qilish uslubi testi";
  const memoryTestInstruction = t("tests.memory_instruction") || "*Har bir savolda sizga eng yaqin javobni tanlang.";

  const [answers, setAnswers] = useState<Array<MemoryOption | null>>(Array(memoryQuestions.length).fill(null));
  const [warning, setWarning] = useState("");
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const savedState = localStorage.getItem(answersStateKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as {
          answers?: Array<MemoryOption | null>;
        };

        if (Array.isArray(parsed.answers) && parsed.answers.length === memoryQuestions.length) {
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
