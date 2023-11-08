'use client';

import { useIsClient } from '@/lib/hooks';
import { Combobox } from '@headlessui/react';

export default function SearchBox() {
  const isClient = useIsClient();

  if (!isClient) {
    // prevent sever side rendering to prevent issue with headlessui providing the input with an id that doesn't match what the server assigns
    return null; // could render a placeholder instead
  }

  return (
    <Combobox>
      <Combobox.Input placeholder="Search..." />
    </Combobox>
  );
}
