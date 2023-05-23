"use client";

import MetaTags from "@/components/atoms/MetaTags";
import SideBar from "@/components/moleculars/SideBar";
import { Stack } from "@mui/material";
import Container from "@mui/material/Container/Container";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { roboto } from "../libs/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sling Academy",
  description:
    "This is a meta description. Welcome to slingacademy.com. Happy coding and have a nice day",
  referrer: "no-referrer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={roboto.className}>
      <body className={inter.className}>
        <Stack direction='row'>
          <SideBar />
          <Container maxWidth='lg'>{children}</Container>
        </Stack>
      </body>
    </html>
  );
}
