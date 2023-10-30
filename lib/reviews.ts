import { readFile, readdir } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir('./content/reviews');
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8'); // second param is character encoding
  const {
    content,
    data: { title, date, image }
  } = matter(text);
  const body = marked(content);

  return { slug, title, date, image, body };
}

export async function getReviews(): Promise<Review[]> {
  const reviews: Review[] = [];
  const slugs = await getSlugs();

  for (const slug of slugs) {
    const review: Review = await getReview(slug);
    reviews.push(review);
  }

  return reviews;
}
