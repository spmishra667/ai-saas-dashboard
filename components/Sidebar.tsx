"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">AI Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/">Dashboard</Link>
        <Link href="/chat">AI Chat</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </div>
  );
}