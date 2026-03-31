'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTestContext } from '@/context/TestContext';
import { useTranslation } from '@/hooks/useTranslation';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function ResultsPage() {
  const router = useRouter();
  const { state, resetTest } = useTestContext();
  const { t } = useTranslation();
  const { width, height } = useWindowSize();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);
  const [persistedRegistration, setPersistedRegistration] = useState<any>(null);
  const [persistedTemperament, setPersistedTemperament] = useState<any>(null);
  const [persistedIQ, setPersistedIQ] = useState<any>(null);
  const [persistedLevel, setPersistedLevel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if no registration data (form not submitted)
  useEffect(() => {
    const registration = localStorage.getItem('registrationData');
    if (!registration && !state.registrationData) {
      router.replace('/tests/form');
    } else {
      setIsLoading(false);
    }
  }, [router, state.registrationData]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const registration = localStorage.getItem('registrationData');
      const temperamentGeneral = localStorage.getItem('temperamentGeneralResult');
      const temperamentKids = localStorage.getItem('temperamentResult') || localStorage.getItem('temperamentKidsResult');
      const iqGeneral = localStorage.getItem('iqGeneralResult');
      const iqKids = localStorage.getItem('iqKidsResult');
      const levelGeneral = localStorage.getItem('levelGeneralResult');
      const levelKids = localStorage.getItem('levelKidsResult');

      if (registration) setPersistedRegistration(JSON.parse(registration));
      if (temperamentGeneral || temperamentKids) {
        setPersistedTemperament(JSON.parse(temperamentGeneral || temperamentKids || 'null'));
      }
      if (iqGeneral || iqKids) {
        setPersistedIQ(JSON.parse(iqGeneral || iqKids || 'null'));
      }
      if (levelGeneral || levelKids) {
        setPersistedLevel(JSON.parse(levelGeneral || levelKids || 'null'));
      }
    } catch {
      // ignore malformed persisted data
    }
  }, []);

  const registrationData = state.registrationData || persistedRegistration;
  const temperamentResult = state.temperamentResult || persistedTemperament;
  const iqResult = state.iqResult || persistedIQ;
  const levelResult = state.levelResult || persistedLevel;

  const temperamentLabels: Record<string, string> = {
    choleric: t('temperament_types.choleric') || 'Choleric',
    sanguine: t('temperament_types.sanguine') || 'Sanguine',
    phlegmatic: t('temperament_types.phlegmatic') || 'Phlegmatic',
    melancholic: t('temperament_types.melancholic') || 'Melancholic',
  };

  const handleSubmitResults = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationData,
          temperamentResult,
          iqResult,
          levelResult,
          category: state.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit results');
      }

       // Clear all test data and redirect
       localStorage.removeItem('registrationData');
       localStorage.removeItem('temperamentGeneralResult');
       localStorage.removeItem('temperamentKidsResult');
       localStorage.removeItem('temperamentResult');
       localStorage.removeItem('temperamentGeneralAnswersState');
       localStorage.removeItem('temperamentKidsAnswersState');
       localStorage.removeItem('iqGeneralResult');
       localStorage.removeItem('iqKidsResult');
       localStorage.removeItem('iqGeneralAnswersState');
       localStorage.removeItem('iqKidsAnswersState');
       localStorage.removeItem('levelGeneralResult');
       localStorage.removeItem('levelKidsResult');
       localStorage.removeItem('levelGeneralAnswersState');
       localStorage.removeItem('levelKidsAnswersState');
       localStorage.removeItem('quizState');
       localStorage.removeItem('quizGeneralState');
       localStorage.removeItem('levelGeneralProgressState');
       localStorage.removeItem('userAnswers');
       localStorage.removeItem('step1Answers');
       localStorage.removeItem('step2Answers');
       localStorage.removeItem('step3Answers');
       localStorage.removeItem('step4Answers');
       localStorage.removeItem('step5Answers');
       localStorage.removeItem('step6Answers');
       localStorage.removeItem('wrongAnswers');
       localStorage.removeItem('currentStep');
       localStorage.removeItem('score');
       localStorage.removeItem('totalCorrect');
       localStorage.removeItem('testCompleted');
       localStorage.removeItem('testFlow');
       localStorage.removeItem('kidsResult');
       localStorage.removeItem('testCategory');

      resetTest();

      // Redirect to home after a delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
       console.error('Error submitting results:', error);
       setSubmitError(t('registration.form_submission_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 text-lg">{t('common.loading') || 'Loading...'}</p>
          </div>
        </div>
      ) : (
        <>
          {showConfetti && <Confetti width={width} height={height} />}

          <div className="max-w-4xl mx-auto">
        {/* Header */}
         <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('results.congratulations') || 'Congratulations!'}</h1>
           <p className="text-gray-600 text-lg">{t('results.tests_completed') || 'You have successfully completed all tests!'}</p>
          </div>

         <div
            className="bg-white rounded-2xl shadow-lg border-2 border-[#EC0000] p-8 mb-8"
            style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">{t('results.results_summary') || 'Your Test Results'}</h2>

            {/* Temperament Results */}
            {temperamentResult && (
              <div className="mt-8 mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {t('results.temperament_result_title') || 'Temperament Test Results'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-600 text-sm mb-2">{t('results.dominant_type') || 'Dominant Type'}:</p>
                  <p className="text-2xl font-bold text-red-600">
                    {temperamentLabels[temperamentResult.dominant] || temperamentResult.dominant}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <p className="text-gray-600 text-xs">{temperamentLabels.choleric}</p>
                    <p className="text-2xl font-bold text-blue-600">{temperamentResult.counts.choleric}</p>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <p className="text-gray-600 text-xs">{temperamentLabels.sanguine}</p>
                    <p className="text-2xl font-bold text-green-600">{temperamentResult.counts.sanguine}</p>
                  </div>
                  <div className="bg-yellow-50 rounded p-3 text-center">
                    <p className="text-gray-600 text-xs">{temperamentLabels.phlegmatic}</p>
                    <p className="text-2xl font-bold text-yellow-600">{temperamentResult.counts.phlegmatic}</p>
                  </div>
                  <div className="bg-purple-50 rounded p-3 text-center">
                    <p className="text-gray-600 text-xs">{temperamentLabels.melancholic}</p>
                    <p className="text-2xl font-bold text-purple-600">{temperamentResult.counts.melancholic}</p>
                  </div>
                </div>
              </div>
            )}

            {/* IQ Test Results */}
            {iqResult && (
              <div className="mb-8 pb-8 border-b-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">{t('results.iq_test_results') || 'IQ Test Results'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">{t('results.score') || 'Score'}</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {iqResult.score}/{iqResult.total}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 md:col-span-2">
                    <p className="text-gray-600 text-sm mb-1">{t('results.level') || 'Level'}</p>
                    <p className="text-2xl font-bold text-green-600">{t(iqResult.level) || iqResult.level}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Level Test Results */}
            {levelResult && (
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {t('results.english_level_results') || 'English Level Test Results'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">{t('results.score') || 'Score'}</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {levelResult.score}/{levelResult.total}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 md:col-span-2">
                    <p className="text-gray-600 text-sm mb-1">{t('results.level') || 'Level'}</p>
                    <p className="text-2xl font-bold text-red-600">{t(levelResult.level) || levelResult.level}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

         {/* Error Message */}
         {submitError && (
            <div className="mb-8 p-4 rounded-lg bg-red-50 border-l-4 border-red-600 text-red-700">
              {submitError}
            </div>
          )}

         {/* Action Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button
             onClick={handleSubmitResults}
             disabled={isSubmitting}
             className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
               isSubmitting
                 ? 'bg-gray-400 cursor-not-allowed'
                 : 'bg-[#EC0000] hover:bg-red-600 transform hover:scale-105'
             }`}
           >
             {isSubmitting ? t('results.submitting') || 'Submitting...' : t('results.submit_results') || 'Submit Results'}
           </button>
           <button
             onClick={() => router.push('/')}
             className="px-8 py-3 rounded-lg font-semibold text-[#EC0000] border-2 border-[#EC0000] hover:bg-red-50 transition-all"
           >
             {t('results.go_home') || 'Go Home'}
           </button>
          </div>
       </div>
        </>
      )}
    </div>
  );
}
