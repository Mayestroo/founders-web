'use client';

import TemperamentTestUnified from '@/components/tests/TemperamentTestUnified';

export default function TemperamentTestGeneral() {
  return (
    <TemperamentTestUnified
      answersStateKey="temperamentGeneralAnswersState"
      resultStorageKey="temperamentGeneralResult"
      nextPath="/tests/memory-general"
    />
  );
}
