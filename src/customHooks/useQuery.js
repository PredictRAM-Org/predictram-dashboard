import React, { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useQuery() {
  const history = useHistory();
  const location = useLocation();
  let search = location.search.slice(1);

  const setQueryParams = (params) => {
    search = new URLSearchParams(params).toString();
    history.push({ pathname: location.pathname, search });
  };

  return [
    useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]),
    setQueryParams,
  ];
}
