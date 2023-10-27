import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

import Heading from '@/components/Heading';

export default async function StardewValleyPage() {
	const text = await readFile('./content/reviews/stardew-valley.md', 'utf8'); // second param is character encoding
    const {content, data: {title, date, image} } = matter(text);
	const htmlContent = marked(content);

	return (
		<>
			<Heading>{title}</Heading>
            <p className='italic pb-2'>{date}</p>
			<img src={image} alt="" width={640} height={360} className="font-semibold font-orbitron  mb-2 rounded" />
			<article dangerouslySetInnerHTML={{ __html: htmlContent }} className='max-w-screen-sm prose prose-slate' />
		</>
	);
}
