import Heading from '@/components/Heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About'
};

export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <p>
        A simple portfolio project built using React, Next.js, TailwindCSS, and
        Strapi CMS.
      </p>
      <br />
      <p>
        Built by{' '}
        <a
          href="https://github.com/RayOlivier"
          target="_blank"
          className="text-purple-800 hover:underline"
        >
          Ray Olivier
        </a>
        . Checkout the{' '}
        <a
          href="https://github.com/RayOlivier/next-reviews"
          target="_blank"
          className="text-purple-800 hover:underline"
        >
          Github Repo
        </a>
        .
      </p>
    </>
  );
}
