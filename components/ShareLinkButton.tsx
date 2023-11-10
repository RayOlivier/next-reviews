'use client'; // changes server component to client component (needed for client side interaction), will be rendered on BOTH the server and browser (server prerenders html, browser renders js (hydration))

import { LinkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-1 items-center border px-2 py-1 rounded text-slate-500 text-sm hover:bg-purple-100 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? 'Copied' : 'Share Link'}
    </button>
  );
}
