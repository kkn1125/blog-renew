"use client";

import { Metadata } from "next";

export const metadata = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      title: "test",
    });
  }, 1000);
});

function Page() {
  return <div>about</div>;
}

export default Page;
