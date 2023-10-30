import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reviews'
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => {
          return (
            <li
              className="bg-white border rounded shadow w-80 hover:shadow-xl"
              key={review.slug}
            >
              <Link href={`/reviews/${review.slug}`}>
                {' '}
                <img
                  src={`/images/${review.slug}.jpg`}
                  alt=""
                  width={640}
                  height={360}
                  className="rounded-t"
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
