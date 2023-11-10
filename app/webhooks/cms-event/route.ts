import { CACHE_TAG_REVIEWS } from '@/lib/reviews';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

// this corresponds with a webhook set up in the Strapi CMS. Strapi will send a POST request whenever there's a change to the entries in the CMS.
export async function POST(request: NextRequest) {
  const payload = await request.json();
  if (payload.model === 'review') {
    // on demand revalidation
    revalidateTag(CACHE_TAG_REVIEWS); // invalidates any data in the cache stored from fetch requests that have this tag
  }
  return new Response(null, { status: 204 });
}
