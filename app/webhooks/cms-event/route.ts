import { NextRequest } from 'next/server';

// this corresponds with a webhook set up in the Strapi CMS. Strapi will send a POST request whenever there's a change to the entries in the CMS.
export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log('payload:', payload);
  return new Response(null, { status: 204 });
}
