'use client';

import dynamic from 'next/dynamic';

const ResultsPage = dynamic(() => import('@/components/tests/ResultsPage'), {
  ssr: false,
});

export default function Results() {
  return <ResultsPage />;
}
