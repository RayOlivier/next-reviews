import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getReview(slug: String) {
	const text = await readFile(`./content/reviews/${slug}.md`, 'utf8'); // second param is character encoding
	const {
		content,
		data: { title, date, image }
	} = matter(text);
	const body = marked(content);

	return { title, date, image, body };
}
