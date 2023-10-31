'use client'; // changes server component to client component (needed for client side interaction), will be rendered on BOTH the server and browser (server prerenders html, browser renders js (hydration))

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
      className="border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      {clicked ? 'Copied' : 'Share Link'}
    </button>
  );
}
