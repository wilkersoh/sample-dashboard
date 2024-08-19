"use client";

import { Layout } from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="m-auto">
        <h2 className="mb-2">Welcome to dashboard</h2>
        <Link href="/users">Go to Users</Link>
      </div>
    </Layout>
  );
}
