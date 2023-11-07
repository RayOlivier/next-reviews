import { marked } from 'marked';
import qs from 'qs';

export const CACHE_TAG_REVIEWS = 'reviews'; // note, matches our strapi model for reviews

const CMS_URL = 'http://localhost:1337';

interface CmsItem {
  id: number;
  attributes: any;
}
export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body?: string;
}

export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}

async function fetchReviews(parameters: any) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    next: {
      // often convenient to set revalidation on fetch requests, will affect all pages that use it. this is background validation.
      // revalidate: 30 // seconds

      tags: [CACHE_TAG_REVIEWS]
    }
  });

  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'],
    populate: {
      image: { fields: ['url'] },
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 100 }
    }
  });

  return data.map((item: CmsItem) => item.attributes.slug);
}

function toReview(item: CmsItem): Review {
  const { attributes } = item;

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes?.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image?.data.attributes.url
  };
}

export async function getReview(slug: string): Promise<Review | null> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: {
      image: { fields: ['url'] },
      pagination: { pageSize: 1, withCount: false }
    }
  });
  if (data.length === 0) {
    return null;
  }
  const item = data[0];

  return {
    ...toReview(item),
    body: marked(item.attributes.body)
  };
}

export async function getReviews(
  pageSize: number,
  page?: number
): Promise<PaginatedReviews> {
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: {
      image: { fields: ['url'] }
    },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page }
  });

  return {
    reviews: data?.map(toReview),
    pageCount: meta.pagination.pageCount
  };
}

// export async function getFeaturedReview(): Promise<Review> {
//   const reviews = await getReviews();
//   return reviews[0];
// }

/*
  Old versions for data from md files
  */

// export async function getSlugs(): Promise<string[]> {
//   const files = await readdir('./content/reviews');
//   return files
//     .filter((file) => file.endsWith('.md'))
//     .map((file) => file.slice(0, -'.md'.length));
// }

// export async function getReviews(): Promise<Review[]> {
//   const reviews: Review[] = [];
//   const slugs = await getSlugs();

//   for (const slug of slugs) {
//     const review: Review = await getReview(slug);
//     reviews.push(review);
//   }

//   reviews.sort((a, b) => b.date.localeCompare(a.date));

//   return reviews;
// }

// export async function getReview(slug: string): Promise<Review> {
//   const text = await readFile(`./content/reviews/${slug}.md`, 'utf8'); // second param is character encoding
//   const {
//     content,
//     data: { title, date, image }
//   } = matter(text);
//   const body = marked(content);

//   return { slug, title, date, image, body };
// }
