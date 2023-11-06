import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// export const revalidate = 300; // seconds, will re-render the page after interval - FIRST request will not show changes, it will generate changes in the BACKGROUND. Second refresh will show changes.

export const metadata: Metadata = {
  title: 'Reviews'
};

export default async function ReviewsPage() {
  const reviews = await getReviews(6);

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => {
          return (
            <li
              className="bg-white border rounded shadow w-80 hover:shadow-xl"
              key={review.slug}
            >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  src={review.image}
                  alt=""
                  width={640}
                  height={360}
                  className="rounded-t"
                  priority={index === 0}
                />
                <h2 className="font-orbitron py-1 text-center">
                  {review.title}
                </h2>
              </Link>
            </li>
          );
        })}

        {/* <li className="bg-white border rounded shadow w-80 hover:shadow-xl">
					<Link href="/reviews/hollow-knight">
						{' '}
						<img src="/images/hollow-knight.jpg" alt="" width={640} height={360} className="rounded-t" />
						<h2 className="font-orbitron py-1 text-center">Hollow Knight</h2>
					</Link>
				</li>
				<li className="bg-white border rounded shadow w-80 hover:shadow-xl">
					<Link href="/reviews/stardew-valley">
						{' '}
						<img src="/images/stardew-valley.jpg" alt="" width={640} height={360} className="rounded-t" />
						<h2 className="font-orbitron py-1 text-center">Stardew Valley</h2>
					</Link>
				</li> */}
      </ul>
    </>
  );
}
