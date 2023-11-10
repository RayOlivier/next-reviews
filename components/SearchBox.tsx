'use client';

import { useIsClient } from '@/lib/hooks';
import { SearchableReview } from '@/lib/reviews';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/navigation'; // other import from router uses old pages routing
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState<SearchableReview[]>([]);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        // anonymous async function that we invoke immediately
        const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();

        setReviews(reviews);
      })();

      return () => controller.abort(); // cancels previous request before useEffect is called again
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  if (!isClient) {
    // prevent sever side rendering to prevent issue with headlessui providing the input with an id that doesn't match what the server assigns
    return null; // could render a placeholder instead
  }

  const handleChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`);
  };

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full cursor-pointer ${
                    active ? 'bg-purple-100' : ''
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
