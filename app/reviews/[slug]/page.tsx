import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';
import { Metadata } from 'next';

// gets the existing slugs from the content files so they are statically rendered pages generated at build time despite dynamic route
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug })); // must be array of objects with slug property
}

export async function generateMetadata({
  params: { slug }
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
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

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2 ">{review.date}</p>
        <ShareLinkButton></ShareLinkButton>
      </div>
      <img
        src={review.image}
        alt=""
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
