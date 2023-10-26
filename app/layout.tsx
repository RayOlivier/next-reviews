import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css'

interface LayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<body>
				<header>
					<ul>
						<li>
							<Link href="/">Home</Link>
							{/* using Link uses client side navigation, no longer fetches new html from server after first load. acts more like a SPA.
              
              in prod, Next prefetches all Links (fetches data, not html)
              */}
						</li>
						<li>
							<Link href="/reviews">Reviews</Link>
						</li>
						<li>
							<Link href="/About" prefetch={false}>
								About
							</Link>
						</li>
					</ul>
				</header>
        <main>

				{children}
        </main>
				<footer>
					Game data and images courtesy of <a href="https://rawg.io/" target='_blank'>RAWG</a>
				</footer>
			</body>
		</html>
	);
}
