"use client";

import { useTestContext } from "@/context/TestContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

type ChoiceQuestion = {
  prompt: string;
  options: string[];
  answer: string;
};

type Part = {
  title: string;
  questions: ChoiceQuestion[];
};

const part3ReadingText = `I am Molly. I’m fourteen. My hobbies are swimming, cooking and skiing. I have got a dog and a cat. We have five family members in our family including me. My mother is a model. She is 180 cm tall. My father is a pilot. He had to arrive from America yesterday, but his flight was canceled and he went to Turkey. My brother is an artist. He can draw well. My sister is a cute girl. She is playing now. 
I’m older than my sister, so I don’t like playing dolls. I have a lot of dreams. I have never been abroad. I would like to go to Egypt, Japan and China. I’m going to learn Japanese next year.`;
const imageSrcs = [
  "/tests/kids1.png",
  "/tests/kids2.png",
  "/tests/kids3.png",
  "/tests/kids4.png",
  "/tests/kids5.png",
  "/tests/kids6.png",
];

const parts: Part[] = [
  {
    title: "Part 1 - Identify the images",
    questions: [
      { prompt: "Image 1", options: ["Track", "Machine", "Car"], answer: "Car" },
      { prompt: "Image 2", options: ["Water", "Swim", "Ocean"], answer: "Swim" },
      { prompt: "Image 3", options: ["Bag", "Suitcase", "Chemodan"], answer: "Suitcase" },
      { prompt: "Image 4", options: ["News", "Journal", "Newspaper"], answer: "Newspaper" },
      { prompt: "Image 5", options: ["Anchor", "Yacht", "Cross"], answer: "Anchor" },
      { prompt: "Image 6", options: ["Elbow", "Hand", "Arm"], answer: "Elbow" },
    ],
  },
  {
    title: "Part 2 - Translate the words",
    questions: [
      {
        prompt: "Sit",
        options: ["Вниз / pastga", "Сидеть / o'tirmoq", "Вставать / turmoq"],
        answer: "Сидеть / o'tirmoq",
      },
      {
        prompt: "Cups",
        options: ["Кепка / kepka", "Стакан / stakan", "Чашка / chashka"],
        answer: "Чашка / chashka",
      },
      {
        prompt: "Drop",
        options: ["Уронить / tushirib yubormoq", "Поднимать / ko'tarmoq", "Ставить / qo'ymoq"],
        answer: "Уронить / tushirib yubormoq",
      },
      {
        prompt: "Meat",
        options: ["Встречать / uchrashmoq", "Мясо / go'sht", "Мёд / asal"],
        answer: "Мясо / go'sht",
      },
      {
        prompt: "Audience",
        options: ["Зрители / tomoshabinlar", "Музыка / musiqa", "Аудио / ovoz"],
        answer: "Зрители / tomoshabinlar",
      },
      {
        prompt: "Steam",
        options: ["Команда / jamoa", "Украсть / o'g'irlamoq", "Пар / bug', par"],
        answer: "Пар / bug', par",
      },
    ],
  },
  {
    title: "Part 3 - Read and answer",
    questions: [
      { prompt: "What's her name?", options: ["My name is Molly.", "I am Molly.", "Her name is Molly."], answer: "Her name is Molly." },
      { prompt: "How old is she?", options: ["She is fourteen.", "I'm fourteen.", "She is five."], answer: "She is fourteen." },
      { prompt: "What is her sister doing at the moment?", options: ["She is playing.", "She is cute.", "She is a cute girl."], answer: "She is playing." },
      { prompt: "What does her father do?", options: ["He went to Turkey.", "He is a pilot.", "He had to arrive from America."], answer: "He is a pilot." },
      { prompt: "What's her future plan?", options: ["She is going to learn Japanese.", "I'm going to learn Japanese.", "I would like to go to Egypt, Japan and China."], answer: "She is going to learn Japanese." },
      { prompt: "What's her mother's job?", options: ["She is an artist.", "She is tall.", "She is a model."], answer: "She is a model." },
      { prompt: "What did her father do yesterday?", options: ["He arrived to America", "His flight was canceled.", "He went to Turkey."], answer: "He went to Turkey." },
      { prompt: "Does she have any pets?", options: ["Yes, she does.", "Yes, she have.", "Yes, she has."], answer: "Yes, she has." },
      { prompt: "Which countries does she want to visit?", options: ["America, Egypt", "China, Japan", "Turkey, Egypt"], answer: "China, Japan" },
      { prompt: "How tall is her mother?", options: ["She is not tall.", "She is a model.", "She is 180 cm tall."], answer: "She is 180 cm tall." },
      { prompt: "What can her brother do?", options: ["He is an artist.", "He can draw well.", "He is a pilot."], answer: "He can draw well." },
      { prompt: "Which countries has Molly been to?", options: ["Egypt, Japan", "China, Egypt, Japan", "She has never been abroad"], answer: "She has never been abroad" },
      { prompt: "Who is younger?", options: ["Her sister", "Molly", "Her brother"], answer: "Her sister" },
      { prompt: "How many people are there in her family?", options: ["There is 5 people.", "There are 5 people.", "There have 5 people."], answer: "There are 5 people." },
      { prompt: "What does Molly like doing?", options: ["Swimming, cooking.", "Swimming.", "Swimming, cooking, skiing."], answer: "Swimming, cooking, skiing." },
    ],
  },
  {
    title: "Part 4 - Rearrange sentence (choose correct)",
    questions: [
      { prompt: "loudly / singing / she / is", options: ["She is singing loudly.", "Is she loudly singing.", "Singing loudly she is."], answer: "She is singing loudly." },
      { prompt: "bananas / I / like", options: ["Bananas I like.", "I like bananas.", "I bananas like."], answer: "I like bananas." },
      { prompt: "does / do / evening? / he / what / in / the", options: ["What does he do in the evening?", "What he does in the evening do?", "In the evening what do he does?"], answer: "What does he do in the evening?" },
      { prompt: "always / milk / my sister / drinks", options: ["Always drinks my sister milk.", "My sister always drinks milk.", "My sister drinks always milk."], answer: "My sister always drinks milk." },
      { prompt: "did / listen / not / to / I / music", options: ["I did not listen to music.", "Did I not listen to music.", "I not did listen to music."], answer: "I did not listen to music." },
      { prompt: "is / he / play / to / football / going", options: ["Is he going to play football?", "He is to going play football?", "Going is he to play football?"], answer: "Is he going to play football?" },
      { prompt: "my / sister / something / reading / interesting / was", options: ["My sister was reading something interesting.", "My sister reading was something interesting.", "Was my sister reading interesting something."], answer: "My sister was reading something interesting." },
      { prompt: "will / in / car / the / I / not / put / it", options: ["I will not put it in the car.", "I not will put in the car it.", "Will I not put it the in car."], answer: "I will not put it in the car." },
    ],
  },
];

const totalQuestions = parts.reduce((sum, part) => sum + part.questions.length, 0);
const levelKidsStateKey = "levelKidsAnswersState";

const createEmptyAnswers = () => parts.map((part) => Array(part.questions.length).fill(""));

function getLevelFromScore(score: number) {
  if (score >= 30) return "Level 06";
  if (score >= 25) return "Level 05";
  if (score >= 18) return "Level 04";
  if (score >= 13) return "Level 03";
  if (score >= 7) return "Level 02";
  return "Level 01";
}

export default function LevelTestKids() {
  const router = useRouter();
  const { setLevelResult } = useTestContext();
  const { t, loading } = useTranslation();

  const [step, setStep] = useState(0);
  const [answersByStep, setAnswersByStep] = useState<string[][]>(createEmptyAnswers());
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const currentPart = parts[step];

  const score = useMemo(() => {
    let sum = 0;
    parts.forEach((part, pIdx) => {
      part.questions.forEach((q, qIdx) => {
        if (answersByStep[pIdx]?.[qIdx] === q.answer) {
          sum += 1;
        }
      });
    });
    return sum;
  }, [answersByStep]);

  useEffect(() => {
    const saved = localStorage.getItem(levelKidsStateKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        step?: number;
        answersByStep?: string[][];
      };

      if (Array.isArray(parsed.answersByStep) && parsed.answersByStep.length === parts.length) {
        const normalized = parsed.answersByStep.map((partAnswers, i) => {
          const needed = parts[i].questions.length;
          const safe = Array.isArray(partAnswers) ? partAnswers.slice(0, needed) : [];
          while (safe.length < needed) safe.push("");
          return safe;
        });
        setAnswersByStep(normalized);
      }

      if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < parts.length) {
        setStep(parsed.step);
      }

    } catch {
      localStorage.removeItem(levelKidsStateKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      levelKidsStateKey,
      JSON.stringify({
        step,
        answersByStep,
      })
    );
  }, [step, answersByStep]);

  if (loading) {
    return <div className="py-12 text-center">{t("common.loading")}</div>;
  }

  const handleSelect = (questionIndex: number, value: string) => {
    setAnswersByStep((prev) => {
      const next = prev.map((arr) => [...arr]);
      next[step][questionIndex] = value;
      return next;
    });
  };

  const allCurrentAnswered = answersByStep[step].every((v) => v);

  const handleNext = () => {
    if (!allCurrentAnswered) {
      const firstUnansweredIndex = answersByStep[step].findIndex((v) => !v);
      const target = questionRefs.current[firstUnansweredIndex];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (step < parts.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const level = getLevelFromScore(score);
    const result = { score, total: totalQuestions, level };
    localStorage.setItem("levelKidsResult", JSON.stringify(result));
    setLevelResult(result);
    router.push("/tests/temperament-kids");
  };

  const globalQuestionOffset = parts.slice(0, step).reduce((sum, part) => sum + part.questions.length, 0);

  return (
    <div className="kids-main pb-12 pt-28">
      <div
        className="m-auto h-auto w-[92%] max-w-5xl rounded-2xl border-2 border-[#EC0000] px-4 py-10 min-[400px]:w-[85%] md:w-[75%] xl:w-[65%]"
        style={{ boxShadow: "15px 15px 40px 0px #FF00004D" }}
      >
        <h1 className="text-center text-2xl font-bold text-gray-900">{t("common.level_test")} - {t("common.kids")}</h1>
        <p className="mb-6 mt-2 text-center text-sm text-red-600">{currentPart.title}</p>

        {step === 2 && (
          <div className="sticky top-0 z-10 mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
            <p className="max-h-56 overflow-y-auto whitespace-pre-line text-gray-700">{part3ReadingText}</p>
          </div>
        )}

        <div className="space-y-4">
          {currentPart.questions.map((q, index) => (
            <div
              key={`${step}-${index}`}
              ref={(el) => {
                questionRefs.current[index] = el;
              }}
              className="rounded-lg bg-gray-50 p-4 shadow-sm"
            >
              <p className="mb-2 font-semibold text-gray-800">
                {globalQuestionOffset + index + 1}.{step === 0 ? "" : ` ${q.prompt}`}
              </p>
              {step === 0 && imageSrcs[index] && (
                <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-md border border-gray-200 bg-white">
                  <Image
                    src={imageSrcs[index]}
                    alt={`${t("tests.image_alt")} ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name={`step-${step}-q-${index}`}
                      checked={answersByStep[step][index] === option}
                      onChange={() => handleSelect(index, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {!allCurrentAnswered && (
            <p className="mb-3 text-sm text-red-600">{t("tests.incomplete_warning")}</p>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-lg bg-[#EC0000] px-6 py-3 text-white transition-all hover:bg-red-600"
          >
            {t("common.next")}
          </button>
        </div>
      </div>
    </div>
  );
}
