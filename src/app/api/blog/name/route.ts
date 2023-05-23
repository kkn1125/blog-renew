import { globSync, sync } from "glob";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

const basePath = "src/database";
const articlesPath = path.join(process.cwd(), basePath);

export async function GET(request: Request) {
  const paths = sync(`${articlesPath}/*.mdx`);
  const pathList = paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split(/\/+|\\+/);
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
  return NextResponse.json({ pathList })
}
