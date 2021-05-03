import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { MyBreadcrumbs } from "@/presentations/pages/[slug]/MyBreadcrumbs";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import { createStyles, makeStyles } from "@material-ui/core";
import { Posts } from "../../Posts";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: 0,
    },
  })
);

type Props = {
  categorizedPosts: PostType[];
  treemapData: TreemapData;
  firstCategory: string;
};

export const SecondCategory = ({
  treemapData,
  categorizedPosts,
  firstCategory,
}: Props) => {
  const classes = useStyles();
  return (
    <Layout
      containerClassName={classes.container}
      headerComponent={"h1"}
      treemapData={treemapData}
    >
      <Posts
        posts={categorizedPosts}
        Breadcrumbs={
          <MyBreadcrumbs showCategory firstCategory={firstCategory} />
        }
      />
    </Layout>
  );
};

type Params = {
  params: {
    firstCategory: string;
    secondCategory: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "category",
    "tag",
  ]);
  const treemapData = getTreemapData(allPosts);

  const categorizedPosts = allPosts.filter((p) => {
    const category = p.category as { first: string; second: string };
    return (
      category.first === params.firstCategory &&
      category.second === params.secondCategory
    );
  });

  return {
    props: {
      categorizedPosts,
      treemapData,
      firstCategory: params.firstCategory,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["category"]);

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          firstCategory: post.category.first,
          secondCategory: post.category.second,
        },
      };
    }),
    fallback: false,
  };
}