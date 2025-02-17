"use client";

import Link from "next/link";

export default function NavbarComponent() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" passHref>
          <div className="text-white text-xl">Utils page</div>
        </Link>
      </div>
    </nav>
  );
}
