import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="px-4 border-b border-gray-200 ">
      <div className="flex justify-between py-2 max-w-screen-md mx-auto">
        <Link href="/" passHref>
          <h1 className="header-1 cursor-pointer">
            Next <span className="text-green-500">Events</span>
          </h1>
        </Link>
        <Link href="/events">
          <a className="btn">All Events</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
