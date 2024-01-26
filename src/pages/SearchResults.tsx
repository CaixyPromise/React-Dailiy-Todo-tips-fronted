import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDescriptionTitle from "../components/hooks/useDescriptionTitle";
import useSearchQuery from "../components/hooks/useSearchQuery";
import LayoutRoutes from "../components/Utilities/LayoutRoutes";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currQueryParam, setCurrQueryParam] = useState<string>("");

  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) {
      navigate("/");
    } else {
      setCurrQueryParam(query);
    }
  }, [navigate, searchParams]);

  const matchedTasks = useSearchQuery(currQueryParam);

  const title = `查找任务结果 "${currQueryParam}"`;

  useDescriptionTitle(title, title);

  return <LayoutRoutes title={title} tasks={matchedTasks}></LayoutRoutes>;
};

export default SearchResults;
