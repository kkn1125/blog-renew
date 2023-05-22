import { GetStaticPaths } from "next";
import React from "react";
import { getAllSlugNames, getArticleFromSlug } from "../../src/libs/mdx";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PostLayout from "../../src/layouts/PostLayout";

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

export default function Page(props: any) {
  const source = props.source;

  return (
    <PostLayout>
      <div>{source.frontmatter.title}</div>
      <MDXRemote {...source} components={components} />
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async (props) => {
  const slugs = await getAllSlugNames();
  console.log(slugs);
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false, // See the "fallback" section below
  };
};

export async function getStaticProps({ params }: any) {
  const postData = await getArticleFromSlug(params.slug);
  const mdxSource = await serialize(postData.content, {
    parseFrontmatter: true,
  });
  mdxSource.frontmatter = postData.frontmatter;
  return {
    props: {
      postData,
      source: mdxSource,
    },
  };
}
