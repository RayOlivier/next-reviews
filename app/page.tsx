import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// export const revalidate = 60; // seconds, will re-render the page after interval dependent on client requests, regardless of backend changes or not

export default async function HomePage() {
  const { reviews } = await getReviews(3);
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="mb-2">The best indie games, reviewed</p>

      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80
                        hover:shadow-xl sm:w-full"
          >
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt=""
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <div className="px-2 py-1 text-center sm:text-left flex flex-col">
                <h2 className="font-orbitron font-semibold">{review.title}</h2>
                <p className="hidden sm:block pt-2">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className="bg-white border rounded shadow w-80 sm:w-full hover:shadow-xl">
        <Link
          href="/reviews/stardew-valley"
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/stardew-valley.jpg"
            alt=""
            width={640}
            height={360}
            className="rounded-t sm:rounded-l sm: rounded-r-none"
          />
          <h2 className="font-orbitron py-1 text-center">Stardew Valley</h2>
        </Link>
      </div> */}
    </>
  );
}
