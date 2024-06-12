import useUrlState from "Shared/hooks/use-url-state";
import _ from "lodash";

interface UseTableData {
  rows: any[];
  count: number;
}

const useTableData = ({ rows, count }: UseTableData): any => {
  const [page, setPage] = useUrlState("page");
  const [pageSize, setPageSize] = useUrlState("pageSize");
  return {
    rows: rows || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / (_.toNumber(pageSize) ?? 10)),
    page: page || 1,
    pageSize: pageSize || 10,
  };
};

export default useTableData;
