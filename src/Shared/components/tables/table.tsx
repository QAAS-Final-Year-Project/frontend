import { FC, ReactNode } from "react";
import TableBodyComponent from "./table-body";
import TableEmptyComponent from "./table-empty";
import TableFooterComponent from "./table-footer";
import TableHeaderComponent from "./table-header";
import TableGridBodyComponent from "./table-grid-body";
import useUrlState from "Shared/hooks/use-url-state";
import { classNames } from "Shared/utils/ui";

interface TableComponentProps<TData = any> {
  title: string;
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  loading?: boolean;
  hideExportButtons?: boolean;
  renderLoader?: FC;
  refetch: () => void;
  hasSearch?: boolean;
  mini?: boolean;
  isRefetching?: boolean;
  fields?: (string | FC<TData>)[];
  onExportClicked?: (type: "excel" | "csv" | "pdf") => void;
  exportDownloading?: "excel" | "csv" | "pdf";
  columns: (string | ReactNode)[];
  loaders?: (("action" | "single" | "double" | "avatar") | FC<TData>)[];
}

const TableComponent: FC<TableComponentProps> = ({
  title,
  data,
  loading,
  columns,
  fields,
  refetch,
  isRefetching,
  hideExportButtons,
  onExportClicked,
  exportDownloading,
  hasSearch,
  mini,
  loaders,
}) => {
  return (
    <div
      className={classNames(
        "dark:bg-[#242A38] bg-white border h-full flex-1 flex flex-col ",
        mini ? "" : " "
      )}
    >
      <div className=' flex-1  flex flex-col overflow-y-hidden min-w-full'>
        {!mini && (
          <TableHeaderComponent
            hasSearch={hasSearch}
            title={title}
            mini={mini}
            refetch={refetch}
            isRefetching={isRefetching}
            onExportClicked={onExportClicked}
            hideExportButtons={hideExportButtons}
            exportDownloading={exportDownloading}
          />
        )}
        {!loading && (data?.total || 0) === 0 ? (
          <TableEmptyComponent title={title} />
        ) : (
          <>
            <div className='flex-1'>
              <TableBodyComponent
                data={data}
                loading={loading}
                columns={columns}
                loaders={loaders}
                fields={fields}
              />
            </div>
            <div className=''>
              <TableFooterComponent data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
