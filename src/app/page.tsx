"use client";

import MetaTags from "@/components/atoms/MetaTags";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const metadata: Metadata = {
  title: "Sling Academy",
  description:
    "This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day",
  referrer: "no-referrer",
};

export default async function Page(props: any) {
  const { pathList } = await getData();

  return (
    <div>
      <ol>
        {pathList.map((path: string, i: number) => (
          <Link key={i} href={"/blog/" + path}>
            {path}
          </Link>
        ))}
      </ol>
    </div>
  );
}

async function getData() {
  const slugs = await fetch("http://localhost:3000/api/blog/name");
  return await slugs.json();
}
