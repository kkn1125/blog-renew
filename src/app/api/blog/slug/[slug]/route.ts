import { globSync, sync } from "glob";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { getArticleFromSlug } from "@/libs/mdx";

const basePath = "src/database";

export async function GET(request: Request, { params }: any) {
	// const articlesPath = path.join(process.cwd(), basePath, `${params.slug}`);
	// const paths = sync(`${basePath}/*.mdx`);
	// const pathList = paths.map((path) => {
	// 	// holds the paths to the directory of the article
	// 	const pathContent = path.split(/\/+|\\+/);
	// 	const fileName = pathContent[pathContent.length - 1];
	// 	const [slug, _extension] = fileName.split(".");

	// 	return slug;
	// });
	const post = await getArticleFromSlug(params.slug)
	return NextResponse.json({ ...post })
}
