import { getAllArticles } from "../src/libs/mdx";

export default function Home(props: any) {
  console.log(props)
  return <div>tes</div>;
}

export async function getStaticProps() {
  const articles = await getAllArticles();

  articles
    .map((article: any) => article.data)
    .sort(
      (
        a: { data: { publishedAt: number } },
        b: { data: { publishedAt: number } }
      ) => {
        if (a.data.publishedAt > b.data.publishedAt) return 1;
        if (a.data.publishedAt < b.data.publishedAt) return -1;

        return 0;
      }
    );

  return {
    props: {
      posts: articles.reverse(),
    },
  };
}
