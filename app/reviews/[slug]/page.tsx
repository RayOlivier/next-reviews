import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Opt out of caching for all data requests in the route segment, will re-render on every refresh. Not ideal, quick and dirty.
// export const dynamic = 'force-dynamic';

/**
 * dynamicParams defaults to true, will generate a page for a slug on demand as needed. (if false, it will return a 404 if the slug isn't defined and statically built at build time via generateStaticParams)
 *
 */
// export const dynamicParams = true;

// gets the existing slugs from the content files so they are statically rendered pages generated at build time despite dynamic route
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug })); // must be array of objects with slug property
}

export async function generateMetadata({
  params: { slug }
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title
  };
}

interface ReviewPageProps {
  params: { slug: string };
}

export default async function ReviewPage({
  params: { slug }
}: ReviewPageProps) {
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3"> {review.subtitle} </p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2 ">{review.date}</p>
        <ShareLinkButton></ShareLinkButton>
      </div>
      <Image
        src={review.image}
        alt=""
        priority
        width={640}
        height={360}
        className="font-semibold font-orbitron  mb-2 rounded"
      />
      {review.body && (
        <article
          dangerouslySetInnerHTML={{ __html: review.body }}
          className="max-w-screen-sm prose prose-slate"
        />
      )}
    </>
  );
}
