'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTestContext } from '@/context/TestContext';
import { useTranslation } from '@/hooks/useTranslation';

const CHOLERIC = 'choleric';
const SANGUINE = 'sanguine';
const PHLEGMATIC = 'phlegmatic';
const MELANCHOLIC = 'melancholic';
const temperamentGeneralStateKey = 'temperamentGeneralAnswersState';

export default function TemperamentTestGeneral() {
  const router = useRouter();
  const { setTemperamentResult } = useTestContext();
  const { t } = useTranslation();

  const questions = [
    {
      q: t('tests.temperament_general_q1'),
      options: [t('tests.temperament_general_q1_a'), t('tests.temperament_general_q1_b'), t('tests.temperament_general_q1_c'), t('tests.temperament_general_q1_d')],
    },
    {
      q: t('tests.temperament_general_q2'),
      options: [t('tests.temperament_general_q2_a'), t('tests.temperament_general_q2_b'), t('tests.temperament_general_q2_c'), t('tests.temperament_general_q2_d')],
    },
    {
      q: t('tests.temperament_general_q3'),
      options: [t('tests.temperament_general_q3_a'), t('tests.temperament_general_q3_b'), t('tests.temperament_general_q3_c'), t('tests.temperament_general_q3_d')],
    },
    {
      q: t('tests.temperament_general_q4'),
      options: [t('tests.temperament_general_q4_a'), t('tests.temperament_general_q4_b'), t('tests.temperament_general_q4_c'), t('tests.temperament_general_q4_d')],
    },
    {
      q: t('tests.temperament_general_q5'),
      options: [t('tests.temperament_general_q5_a'), t('tests.temperament_general_q5_b'), t('tests.temperament_general_q5_c'), t('tests.temperament_general_q5_d')],
    },
    {
      q: t('tests.temperament_general_q6'),
      options: [t('tests.temperament_general_q6_a'), t('tests.temperament_general_q6_b'), t('tests.temperament_general_q6_c'), t('tests.temperament_general_q6_d')],
    },
    {
      q: t('tests.temperament_general_q7'),
      options: [t('tests.temperament_general_q7_a'), t('tests.temperament_general_q7_b'), t('tests.temperament_general_q7_c'), t('tests.temperament_general_q7_d')],
    },
    {
      q: t('tests.temperament_general_q8'),
      options: [t('tests.temperament_general_q8_a'), t('tests.temperament_general_q8_b'), t('tests.temperament_general_q8_c'), t('tests.temperament_general_q8_d')],
    },
    {
      q: t('tests.temperament_general_q9'),
      options: [t('tests.temperament_general_q9_a'), t('tests.temperament_general_q9_b'), t('tests.temperament_general_q9_c'), t('tests.temperament_general_q9_d')],
    },
    {
      q: t('tests.temperament_general_q10'),
      options: [t('tests.temperament_general_q10_a'), t('tests.temperament_general_q10_b'), t('tests.temperament_general_q10_c'), t('tests.temperament_general_q10_d')],
    },
  ];

  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<{ counts: Record<string, number>; dominant: string } | null>(null);
  const [incomplete, setIncomplete] = useState(false);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(temperamentGeneralStateKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: Array<number | null>;
        showResult?: boolean;
        resultData?: { counts: Record<string, number>; dominant: string } | null;
      };

      if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
        setAnswers(parsed.answers);
      }

      if (parsed.resultData) {
        setResultData(parsed.resultData);
      }

      if (parsed.showResult) {
        setShowResult(true);
        const savedResult = localStorage.getItem('temperamentGeneralResult');
        if (savedResult) {
          setTemperamentResult(JSON.parse(savedResult));
        }
      }
    } catch {
      localStorage.removeItem(temperamentGeneralStateKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      temperamentGeneralStateKey,
      JSON.stringify({
        answers,
        showResult,
        resultData,
      })
    );
  }, [answers, showResult, resultData]);

  useEffect(() => {
    if (showResult) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResult]);

  const mapIndexToType = (oi: number): string =>
    oi === 0 ? CHOLERIC : oi === 1 ? SANGUINE : oi === 2 ? PHLEGMATIC : MELANCHOLIC;

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
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setIncomplete(false);

    const counts = answers.reduce(
      (acc, ans) => {
        const k = mapIndexToType(ans as number);
        if (k) (acc as any)[k] += 1;
        return acc;
      },
      { [CHOLERIC]: 0, [SANGUINE]: 0, [PHLEGMATIC]: 0, [MELANCHOLIC]: 0 }
    );

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    
    // Store result in context
    setTemperamentResult({ counts: counts as Record<string, number> as any, dominant });

    // Store in localStorage as backup
    localStorage.setItem('temperamentGeneralResult', JSON.stringify({ counts, dominant }));

    setResultData({ counts, dominant });
    setShowResult(true);
  };

  const containerClass = showResult
    ? 'max-w-3xl mx-auto mt-10 mb-12 px-4 pt-6 pb-6'
    : 'max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white';

  return (
    <div className={containerClass} style={!showResult ? { boxShadow: '15px 15px 40px 0px #FF00004D' } : undefined}>
      {!showResult && <p className="text-sm text-gray-700 mb-2">{t('tests.category_selection')}</p>}
      <h1 className="text-2xl font-bold mb-1">{t('common.temperament_test')} - {t('common.general')}</h1>
      {!showResult ? (
        <>
          <p className="text-sm text-red-600 mb-6">{t('tests.temperament_instruction')}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div
                key={qi}
                ref={(el) => {
                  if (el) questionRefs.current[qi] = el;
                }}
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
            {incomplete && (
              <p className="text-red-600 text-sm mb-2">{t('tests.incomplete_warning')}</p>
            )}
            <button
              type="submit"
              className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
            >
              {t('results.results_summary')}
            </button>
          </form>
        </>
      ) : (
         <ResultCard data={resultData} total={questions.length} t={t} onDone={() => {
           router.push('/tests/iq-general');
         }} />
      )}
    </div>
  );
}

function ResultCard({
  data,
  total,
  t,
  onDone,
}: {
  data: { counts: Record<string, number>; dominant: string } | null;
  total: number;
  t: (key: string) => string;
  onDone: () => void;
}) {
  if (!data) return null;

  return (
    <div
      className="flex flex-col items-center justify-center w-[92%] max-w-xl m-auto py-10 px-7 rounded-2xl bg-white shadow-xl text-center"
      style={{ boxShadow: '0 20px 40px rgba(236,0,0,0.18)' }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {t('tests.temperament_done')}
      </h2>
      <p className="mb-6 max-w-3xl text-center text-lg font-medium text-gray-700">
        {t('tests.temperament_next_notice')}
      </p>
      <button
        onClick={onDone}
        className="w-auto m-auto mt-2 bg-red-500 text-white py-2.5 px-6 rounded-lg hover:bg-red-600 transition duration-300"
      >
        {t('common.next')}
      </button>
    </div>
  );
}
