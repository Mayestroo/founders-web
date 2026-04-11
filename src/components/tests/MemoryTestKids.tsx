"use client";

import MemoryTypeTest from "@/components/tests/MemoryTypeTest";

export default function MemoryTestKids() {
  return (
    <MemoryTypeTest
      answersStateKey="memoryKidsAnswersState"
      resultStorageKey="memoryKidsResult"
      nextPath="/tests/form"
    />
  );
}
