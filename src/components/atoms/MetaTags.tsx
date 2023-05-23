import { Metadata } from "next";
import Head from "next/head";
import React from "react";

function MetaTags({ data }: { data: Metadata }) {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </>
  );
}

export default MetaTags;
