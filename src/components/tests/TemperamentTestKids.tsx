"use client";

import TemperamentTestUnified from "@/components/tests/TemperamentTestUnified";

export default function TemperamentTestKids() {
  return (
    <TemperamentTestUnified
      answersStateKey="temperamentKidsAnswersState"
      resultStorageKey="temperamentResult"
      nextPath="/tests/memory-kids"
    />
  );
}
