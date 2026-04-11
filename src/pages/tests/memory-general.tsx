'use client';

import dynamic from 'next/dynamic';

const MemoryTestGeneral = dynamic(() => import('@/components/tests/MemoryTestGeneral'), {
  ssr: false,
});

export default function MemoryGeneralPage() {
  return <MemoryTestGeneral />;
}
