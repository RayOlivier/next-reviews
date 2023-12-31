import 'server-only'; // prevents these functions (and therefore fetching data directly from the cms in this case) from being used in client components

import { marked } from 'marked';
import qs from 'qs';

export const CACHE_TAG_REVIEWS = 'reviews'; // note, matches our strapi model for reviews

const CMS_URL = process.env.CMS_URL;

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

export type SearchableReview = Pick<Review, 'slug' | 'title'>;

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

export async function searchReviews(
  query: string | null
): Promise<SearchableReview[]> {
  //  strapi filters: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ['slug', 'title'],
    populate: {
      image: { fields: ['url'] },
      sort: ['title'],
      pagination: { pageSize: 5 }
    }
  });

  return data.map((item: CmsItem) => ({
    slug: item.attributes.slug,
    title: item.attributes.title
  }));
}

function toReview(item: CmsItem): Review {
  const { attributes } = item;

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes?.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: new URL(attributes.image?.data.attributes.url, CMS_URL).href
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
