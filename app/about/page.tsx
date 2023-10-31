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
        A simple project from the Udemy course &quotNext.js by Example&quot,
        taught by Mirko Nasato.
      </p>
    </>
  );
}
