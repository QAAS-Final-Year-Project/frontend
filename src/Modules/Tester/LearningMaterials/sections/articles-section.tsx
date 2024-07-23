import React, { useMemo } from "react";
import ArticleCard from "../components/acticle-card";
import { learningMaterialsArticles } from "../data";
import PaginationComponent from "Shared/components/nav/pagination";
import useTableData from "Shared/utils/use-table-data";
import { useLearningArticles } from "./hooks";
import useUrlState from "Shared/hooks/use-url-state";
import AppConfig from "config";

type Props = {};

const ArticlesSection = (props: Props) => {
  const [page] = useUrlState<number>("page", 1);
  const [search] = useUrlState<string>("", "");
  const [pageSize] = useUrlState<number>("pageSize", 5);
  const filter = useMemo(
    () => ({
      page: page || 1,
      pageSize: pageSize || 5,
      search: (search || "").toString(),
    }),
    [page, pageSize, search]
  );

  const { articles, count } = useLearningArticles(filter);

  const records = useTableData({ rows: articles, count: count });

  return (
    <div className='space-y-10  '>
      {records?.rows?.map((article, index) => (
        <a href='pages-blog-post.html' className='blog-post' key={index}>
          <ArticleCard
            tag={article.tag}
            img={"https://www.vasterad.com/themes/hireo_21/" + article.img}
            date={article.date}
            title={article.title}
            description={article.description}
          />
        </a>
      ))}

      {<PaginationComponent data={records} />}
    </div>
  );
};

export default ArticlesSection;
