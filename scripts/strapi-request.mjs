import { writeFileSync } from 'fs';
import qs from 'qs';

// quick test of the strapi api separate from the app
// run via 'node scripts/strapi-request.mjs'

const url =
  'http://localhost:1337/api/reviews' +
  '?' +
  qs.stringify(
    {
      fields: ['slug', 'title', 'subtitle', 'publishedAt'],
      populate: { image: { fields: ['url'] } },
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 6, page: 1 }
    },
    { encodeValuesOnly: true }
  );
console.log('url:', url);
const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = 'scripts/strapi-response.json';
writeFileSync(file, formatted, 'utf8');
