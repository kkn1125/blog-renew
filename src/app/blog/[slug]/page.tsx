'use client'

import { getArticleFromSlug } from "@/libs/mdx";
// import { getArticleFromSlug } from "@/libs/slugs";
import { GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PostLayout from "../../../layouts/PostLayout";
// import { getAllSlugNames, getArticleFromSlug } from "../../../libs/mdx";

interface CodeBlockProps {
  children: string;
  className: string;
}

const components = {
  code: ({ children, className }: CodeBlockProps) => {
    const language = className.replace(/language-/, "");

    return (
      <SyntaxHighlighter
        showLineNumbers
        language={language}
        style={tomorrowNight}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default async function Page(props: any) {
  const { source } = await getData(props.params.slug) as any;

  return (
    <PostLayout>
      <div>{source.frontmatter?.title || ''}</div>
      <MDXRemote {...source} components={components} />
    </PostLayout>
  );
}

// export const getStaticPaths: GetStaticPaths = async (props) => {
//   const slugs = await getAllSlugNames();
//   console.log(slugs);
//   return {
//     paths: slugs.map((slug) => ({ params: { slug: slug } })),
//     fallback: false, // See the "fallback" section below
//   };
// };

async function getData(slug: string) {
  const slugs = await fetch(`http://localhost:3000/api/blog/slug/${slug}`);
  const post = await slugs.json();
  const mdxSource = await serialize(post.content || "", {
    parseFrontmatter: true,
    mdxOptions: {
      development: true
    }
  });
  mdxSource.frontmatter = post.frontmatter;
  return {
    post,
    source: mdxSource,
  };
}

// async function getData(slug: string) {
//   const postData = await getArticleFromSlug(slug);
//   const mdxSource = await serialize(postData.content, {
//     parseFrontmatter: true,
//   });
//   mdxSource.frontmatter = postData.frontmatter;
//   return {
//     postData,
//     source: mdxSource,
//   };
// }
