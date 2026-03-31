'use client';

import dynamic from 'next/dynamic';

const IQTestGeneral = dynamic(() => import('@/components/tests/IQTestGeneral'), {
  ssr: false,
});

export default function IQGeneralPage() {
  return <IQTestGeneral />;
}
