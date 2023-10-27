import Heading from '@/components/Heading';
import Link from 'next/link';

export default function HomePage() {
	console.log('HomePage rendered');
	return (
		<>
			<Heading>Indie Gamer</Heading>
			<p>The best indie games, reviewed</p>
			<div className="bg-white border rounded shadow w-80 sm:w-full hover:shadow-xl">
				<Link href="/reviews/stardew-valley" className='flex flex-col sm:flex-row'>
					<img src="/images/stardew-valley.jpg" alt="" width={640} height={360} className="rounded-t sm:rounded-l sm: rounded-r-none" />
					<h2 className="font-orbitron py-1 text-center">Stardew Valley</h2>
				</Link>
			</div>
		</>
	);
}
