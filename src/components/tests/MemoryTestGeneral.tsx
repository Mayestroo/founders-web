'use client';

import MemoryTypeTest from '@/components/tests/MemoryTypeTest';

export default function MemoryTestGeneral() {
  return (
    <MemoryTypeTest
      answersStateKey="memoryGeneralAnswersState"
      resultStorageKey="memoryGeneralResult"
      nextPath="/tests/form"
    />
  );
}
