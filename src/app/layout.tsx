"use client";

import { Container } from "@mui/material";
import React from "react";

function Layout({ children }: { children: React.ReactElement }) {
  return (
    <html>
      <head></head>
      <body>
        <Container maxWidth='lg'>{children}</Container>
      </body>
    </html>
  );
}

export default Layout;
