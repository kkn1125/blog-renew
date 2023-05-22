import { serialize } from "next-mdx-remote/serialize";
import { globSync, sync } from "glob";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import readingTime from "reading-time";
import fs from "fs";

export const serializeMdx = (source: string) => {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: "mdx",
    },
  });
};

const articlesPath = path.join(process.cwd(), "pages/blog");

export async function getSlug() {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

export async function getArticleFromSlug(slug: string) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir) as unknown as string;
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      slug,
      excerpt: data.excerpt,
      title: data.title,
      publishedAt: data.publishedAt,
      readingTime: readingTime(source).text,
      ...data,
    },
  };
}

export async function getAllArticles() {
  const articles = fs.readdirSync(path.join(process.cwd(), "pages/blog"));

  return articles.reduce((allArticles: any, articleSlug) => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), "pages/blog", articleSlug),
      "utf-8"
    );
    const { data } = matter(source);

    if (articleSlug.match(/\.mdx/)) {
      return [
        {
          ...data,
          slug: articleSlug.replace(".mdx", ""),
          readingTime: readingTime(source).text,
        },
        ...allArticles,
      ];
    } else {
      return allArticles;
    }
  }, []);
}
