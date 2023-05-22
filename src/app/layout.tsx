"use client";

import Container from "@mui/material/Container/Container";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
