import { Category } from "@/components/Category";
import Head from "next/head";
import { H2Header } from "@/components/h2Header";
import Layout from "@/components/Layout";
import { getAllPosts, getTreemapData } from "@/lib/api";
import { PostType } from "@/types/post";
import { TreemapData } from "@/types/treemapData";
import Box from "@mui/material/Box";
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { MyBreadcrumbs } from "../[slug]/MyBreadcrumbs";
import { Posts } from "./Posts";
import { useCategoryOuterStyles } from "./useCategoryOuterStyles";

const width = 100;
const pad = 4;
const post = (width - pad) / 2;

const useStyles = makeStyles((theme: Theme) => ({
  post: {
    [theme.breakpoints.up("ss")]: {
      paddingLeft: 0,
      paddingRight: 0,
      width: "100%",
    },
    [theme.breakpoints.up("s")]: {
      paddingLeft: 0,
      paddingRight: 0,
      width: "100%",
    },
    [theme.breakpoints.up("t")]: {
      width: `${post}%`,
    },
  },
  pad: {
    [theme.breakpoints.up("ss")]: {
      width: "0%",
    },
    [theme.breakpoints.up("s")]: {
      width: "0%",
    },
    [theme.breakpoints.up("t")]: {
      width: `${pad}%`,
    },
  },
}));

type Props = {
  allPosts: PostType[];
  treemapData: TreemapData;
};

export const CategoryPage = ({ treemapData, allPosts }: Props) => {
  const classes = { ...useStyles(), ...useCategoryOuterStyles() };
  return (
    <Layout title={`カテゴリ一覧 | かじりブログ`}>
      <Head>
        <meta property="og:image" content="/ogp/1200x630.png" />
      </Head>
      <Box>
        <MyBreadcrumbs />
        <Box height={10}></Box>
        <H2Header word="カテゴリ" h2Style={{ marginBottom: 0 }} />
        <Box className={classes.categoryOuter}>
          <Category treemapData={treemapData} />
        </Box>
        <Box height={40}></Box>
        <Posts posts={allPosts} />
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "category",
    "tags",
  ]);
  const treemapData = getTreemapData(allPosts);

  return {
    props: { allPosts, treemapData },
  };
};
