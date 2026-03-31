'use client';

import dynamic from 'next/dynamic';

const RegistrationForm = dynamic(() => import('@/components/tests/RegistrationForm'), {
  ssr: false,
});

export default function FormPage() {
  return <RegistrationForm />;
}
