"use client";

import { Container } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: { children: React.ReactElement }) {
  return <Container maxWidth='lg'>{children}</Container>;
}

export default Layout;
