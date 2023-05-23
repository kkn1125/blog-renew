import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

export async function generateMetadata({ params }: any) {
  console.log("params", params);
  return {
    title: "test",
  };
}

export default async function Page(props: any) {
  const { source } = (await getData(props.params.slug)) as any;

  return (
    <div>
      <div>{source.frontmatter?.title || ""}</div>
      <MDXRemote {...source} components={components} />
    </div>
  );
}

async function getData(slug: string) {
  const slugs = await fetch(`http://localhost:3000/api/blog/slug/${slug}`);
  const post = await slugs.json();
  const mdxSource = await serialize(post.content || "", {
    parseFrontmatter: true,
    mdxOptions: {
      development: true,
    },
  });
  mdxSource.frontmatter = post.frontmatter;
  return {
    post,
    source: mdxSource,
  };
}
