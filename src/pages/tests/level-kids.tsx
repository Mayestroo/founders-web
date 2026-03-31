'use client';

import dynamic from 'next/dynamic';

const LevelTestKids = dynamic(() => import('@/components/tests/LevelTestKids'), {
  ssr: false,
});

export default function LevelKidsPage() {
  return <LevelTestKids />;
}
