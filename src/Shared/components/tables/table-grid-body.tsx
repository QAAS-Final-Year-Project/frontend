import { FC } from "react";

interface TableGridBodyComponentProps<TData = any> {
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  renderItem?: FC<TData>;
  renderLoader?: FC;
  loading?: boolean;
}

const TableGridBodyComponent: FC<TableGridBodyComponentProps> = ({ data, renderItem, loading, renderLoader }) => {

  return (
    <div className="mt-5 flex-1  overflow-y-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        renderLoader?.({}) ?? (
          <div className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 border-b border-gray-200  flex-1">
            <div className="bg-gray-500 dark:bg-gray-400 h-3 rounded-md w-full animate-pulse" />
          </div>
        )
      ) : (
        data.rows?.map((item) => renderItem?.(item))
      )}
    </div>
    </div>
  )
}

export default TableGridBodyComponent;