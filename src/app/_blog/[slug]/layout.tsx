import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js",
};

function Layout({ children }: { children: React.ReactElement }) {
  return <div>{children}</div>;
}

export default Layout;
