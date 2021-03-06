import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ChevronRight from "@mui/icons-material/ChevronRight";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Box from "@mui/material/Box";

type Props = {
  firstCategory?: string;
  secondCategory?: string;
  showCategory?: boolean;
};

export const MyBreadcrumbs = ({
  firstCategory,
  secondCategory,
  showCategory,
}: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <Breadcrumbs separator={<ChevronRight color="disabled" />}>
        <Link color="inherit" href={`/`} style={{ display: "flex" }}>
          <HomeOutlined />
        </Link>
        {showCategory && (
          <Link color="inherit" href={`/category`}>
            {"カテゴリ一覧"}
          </Link>
        )}
        {firstCategory && (
          <Link color="inherit" href={`/category/${firstCategory}`}>
            {firstCategory}
          </Link>
        )}
        {secondCategory && (
          <Link
            color="inherit"
            href={`/category/${firstCategory}/${secondCategory}`}
          >
            {secondCategory}
          </Link>
        )}
      </Breadcrumbs>
      <Box marginX={"8px"} display="flex">
        <ChevronRight color="disabled" />
      </Box>
    </Box>
  );
};
