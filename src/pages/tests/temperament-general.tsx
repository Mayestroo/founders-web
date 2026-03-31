'use client';

import dynamic from 'next/dynamic';

const TemperamentTestGeneral = dynamic(() => import('@/components/tests/TemperamentTestGeneral'), {
  ssr: false,
});

export default function TemperamentGeneralPage() {
  return <TemperamentTestGeneral />;
}
