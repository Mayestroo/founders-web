'use client';

import dynamic from 'next/dynamic';

const LevelTestGeneral = dynamic(() => import('@/components/tests/LevelTestGeneral'), {
  ssr: false,
});

export default function LevelGeneralPage() {
  return <LevelTestGeneral />;
}
