'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTestContext } from '@/context/TestContext';
import { useTranslation } from '@/hooks/useTranslation';
const iqGeneralStateKey = 'iqGeneralAnswersState';

// Shape components for visual IQ questions
const Square = ({ size = 16, color = '#000', filled = false, className = '' }: { size?: number; color?: string; filled?: boolean; className?: string }) => (
  <span
    className={className}
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      backgroundColor: filled ? color : 'transparent',
      border: `2px solid ${color}`,
      boxSizing: 'border-box',
    }}
  />
);

const Circle = ({ size = 16, color = '#000', filled = true, className = '' }: { size?: number; color?: string; filled?: boolean; className?: string }) => (
  <span
    className={className}
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: filled ? color : 'transparent',
      border: `2px solid ${color}`,
      boxSizing: 'border-box',
    }}
  />
);

const Triangle = ({ size = 12, color = '#EC0000', filled = true, className = '' }: { size?: number; color?: string; filled?: boolean; className?: string }) => (
  <span
    className={className}
    style={{
      display: 'inline-block',
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.6}px solid ${filled ? color : 'transparent'}`,
      borderTop: filled ? 'none' : `${size * 1.6}px solid ${color}`,
    }}
  />
);

export default function IQTestGeneral() {
  const router = useRouter();
  const { setIQResult } = useTestContext();
  const { t } = useTranslation();

  const questions: Array<{
    q: string | React.ReactNode;
    options: Array<string | React.ReactNode>;
    correct: number;
    subtext?: string;
  }> = [
    {
      q: `${t('tests.arithmetic_sequence')}: 4, 6, 9, 13, 18, —?`,
      options: [t('tests.option_a_22'), t('tests.option_b_24'), t('tests.option_c_26'), t('tests.option_d_28')],
      correct: 1,
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t('tests.shape_matrix_logic')}</div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <span className="inline-block w-6 h-[2px] bg-black align-middle" />
            <span>?</span>
          </div>
        </div>
      ),
      options: [
        <span key="a" className="flex items-center gap-2">
          <span className="mr-1">A)</span>
          <Square color="#000" filled />
          <Square color="#000" />
          <Square color="#000" filled />
          <Square color="#000" />
        </span>,
        <span key="b" className="flex items-center gap-2">
          <span className="mr-1">B)</span>
          <Square color="#000" />
          <Square color="#000" />
          <Square color="#000" filled />
          <Square color="#000" filled />
        </span>,
        <span key="c" className="flex items-center gap-2">
          <span className="mr-1">C)</span>
          <Square color="#000" filled />
          <Square color="#000" filled />
          <Square color="#000" />
          <Square color="#000" />
        </span>,
        <span key="d" className="flex items-center gap-2">
          <span className="mr-1">D)</span>
          <Square color="#000" />
          <Square color="#000" filled />
          <Square color="#000" filled />
          <Square color="#000" />
        </span>,
      ],
      correct: 0,
    },
    {
      q: t('tests.iq_general_logic'),
      options: [t('tests.iq_general_opt_a'), t('tests.iq_general_opt_b'), t('tests.iq_general_opt_c'), t('tests.iq_general_opt_d')],
      correct: 1,
    },
    {
      q: t('tests.iq_general_count_q'),
      subtext: '5 7 # 9 @ 3 % 1 & 2 !',
      options: [t('tests.option_a_3'), t('tests.option_b_4'), t('tests.option_c_5'), t('tests.option_d_6')],
      correct: 3,
    },
    {
      q: '12 : 18 = x : 27 → x = ?',
      options: [t('tests.option_a_16'), t('tests.option_b_18'), t('tests.option_c_24'), t('tests.option_d_36')],
      correct: 3,
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t('tests.shape_pattern')}</div>
          <div className="flex items-center gap-2 mb-2">
            <Triangle color="#000" />
            <Triangle color="#000" />
            {'\u25BC'}
            <Triangle color="#000" />
            <Triangle color="#000" />
            {'\u25BC'}
            <Triangle color="#000" />
            <span className="inline-block w-6 h-[2px] bg-black align-middle" />
            <span>{t('tests.next_pattern')}</span>
          </div>
        </div>
      ),
      options: [
        <span key="a" className="flex items-center gap-2">
          <span className="mr-1">A)</span>
          <Triangle color="#000" />
        </span>,
        <span key="b" className="flex items-center gap-2">
          <span className="mr-1">B)</span>
          {'\u25BC'}
        </span>,
        <span key="c" className="flex items-center gap-2">
          <span className="mr-1">C)</span>
          <Circle color="#000" />
        </span>,
        <span key="d" className="flex items-center gap-2">
          <span className="mr-1">D)</span>
          <Square color="#000" filled />
        </span>,
      ],
      correct: 1,
    },
    {
      q: t('tests.iq_general_height_q'),
      options: [t('tests.option_a_1'), t('tests.option_b_2'), t('tests.option_c_3'), t('tests.option_d_4')],
      correct: 0,
    },
    {
      q: t('tests.iq_general_vowels_q'),
      options: [t('tests.option_a_2'), t('tests.option_b_3'), t('tests.option_c_4'), t('tests.option_d_7')],
      correct: 3,
    },
    {
      q: t('tests.iq_general_logical_q'),
      options: [t('tests.iq_general_opt_a2'), t('tests.iq_general_opt_b2'), t('tests.iq_general_opt_c2'), t('tests.iq_general_opt_d2')],
      correct: 2,
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t('tests.shape_analogy')}</div>
          <div className="text-gray-700 mb-2">{t('tests.circle_angle_analogy')}</div>
        </div>
      ),
      options: [t('tests.option_a_90'), t('tests.option_b_180'), t('tests.option_c_270'), t('tests.option_d_360')],
      correct: 3,
    },
    {
      q: t('tests.iq_general_time_q'),
      options: [t('tests.iq_general_time_opt_a'), t('tests.iq_general_time_opt_b'), t('tests.iq_general_time_opt_c'), t('tests.iq_general_time_opt_d')],
      correct: 1,
    },
  ];

  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(iqGeneralStateKey);
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
      if (typeof parsed.score === 'number') setScore(parsed.score);
      if (typeof parsed.level === 'string') setLevel(parsed.level);
      if (parsed.showResult) {
        setShowResult(true);
        const savedResult = localStorage.getItem('iqGeneralResult');
        if (savedResult) {
          setIQResult(JSON.parse(savedResult));
        }
      }
    } catch {
      localStorage.removeItem(iqGeneralStateKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      iqGeneralStateKey,
      JSON.stringify({
        answers,
        showResult,
        score,
        level,
      })
    );
  }, [answers, showResult, score, level]);

  useEffect(() => {
    if (showResult) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResult]);

  const handleSelect = (qi: number, oi: number) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
    setWarning('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstUnanswered = answers.findIndex((a) => a === null || a === undefined);
    if (firstUnanswered !== -1) {
      setWarning(t('tests.incomplete_warning'));
      const el = document.getElementById(`iq-general-q-${firstUnanswered}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const calculatedScore = questions.reduce((acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc), 0);

    let levelKey = '';
    if (calculatedScore >= 11) {
      levelKey = 'tests.very_high_level';
    } else if (calculatedScore >= 9) {
      levelKey = 'tests.high_level';
    } else if (calculatedScore >= 7) {
      levelKey = 'tests.average_level';
    } else {
      levelKey = 'tests.practice_recommended';
    }

    setScore(calculatedScore);
    setLevel(t(levelKey));

    // Store result in context - store the KEY, not the translated text
    setIQResult({ score: calculatedScore, total: questions.length, level: levelKey });

    // Store in localStorage as backup
    localStorage.setItem('iqGeneralResult', JSON.stringify({ score: calculatedScore, total: questions.length, level: levelKey }));

    setShowResult(true);
  };

  return (
    <div
      className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white"
      style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}
    >
      {!showResult ? (
        <>
          <h1 className="text-2xl font-bold mb-1">{t('common.iq_test')} - {t('common.general')}</h1>
          <p className="text-sm text-red-600 mb-2">{t('tests.iq_instruction')}</p>
          {warning && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{warning}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div id={`iq-general-q-${qi}`} key={qi} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">
                  {qi + 1}. {q.q}
                </p>
                {q.subtext && <p className="text-gray-600 mb-2 font-mono">{q.subtext}</p>}
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
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
              {t('results.results_summary')}
            </button>
          </form>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t('common.iq_test')}</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
            <p className="mx-auto mb-6 max-w-3xl text-center text-lg font-medium text-gray-700">
              {t('tests.iq_done')}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  router.push('/tests/level-general');
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('common.next')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
