"use client";
import React from "react";
import Link from "next/link";


export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav>
        <ul className="flex justify-between items-center p-4">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
