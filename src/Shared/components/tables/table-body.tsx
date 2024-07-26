import { classNames } from "Shared/utils/ui";
import _ from "lodash";
import { FC, ReactNode, isValidElement } from "react";
import Shimmers from "./shimmers";

interface TableBodyComponentProps<TData = any> {
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  columns?: (string | ReactNode)[];
  fields?: (string | FC<TData>)[];
  loaders?: (("action" | "single" | "double" | "avatar") | FC<TData>)[];
  loading?: boolean;
  fixed?: boolean;
}

const TableBodyComponent: FC<TableBodyComponentProps> = ({
  columns,
  data,
  loading,
  loaders,
  fields,
}) => {
  const loaderMappings = {
    single: <Shimmers.SingleShimmer />,
    double: <Shimmers.DoubleShimmer />,
    avatar: <Shimmers.AvatarShimmer />,
    action: <Shimmers.ActionsShimmer actionsCount={3} />,
  };
  return (
    <div className={" relative flex-1"}>
      <table className={`w-full`}>
        <thead>
          <tr
            className=' bg-[#2a41e8] 
             text-left dark:text-white h-[57px] '
          >
            {columns.map((column, index, arr) => {
              if (isValidElement(column)) {
                return (
                  <th
                    key={index}
                    className={classNames(
                      "text-center  dark:border-gray-600 dark:bg-[#242A38]",
                      index == 0 ? "" : "",
                      index == arr.length - 1 ? "" : ""
                    )}
                  >
                    {column}
                  </th>
                );
              } else if (typeof column === "string") {
                return (
                  <th
                    key={index}
                    className={classNames(
                      "text-center  dark:border-gray-600  dark:bg-[#242A38] text-white text-base font-medium",
                      index == 0 ? "" : "",
                      index == arr.length - 1 ? "" : ""
                    )}
                  >
                    {column}
                  </th>
                );
              } else {
                return <></>;
              }
            })}
          </tr>
        </thead>
        <tbody className='dark:bg-[#242A38] text-[#666666] text-base'>
          {loading ? (
            <tr>
              {loaders &&
                loaders.map((loader, idx) => (
                  <td className='px-6 py-4 '>
                    {loaderMappings[loader as string] || (
                      <Shimmers.SingleShimmer />
                    )}
                  </td>
                ))}
            </tr>
          ) : (
            data.rows.map((row, index) => {
              return (
                <tr
                  key={index}
                  className={classNames(
                    " text-left w-full rounded border-b border-b-neutral-100  ",
                    index % 2 !== 0 ? "bg-zinc-100" : ""
                  )}
                >
                  {fields &&
                    fields.map((field, fieldIndex) =>
                      typeof field === "string" ? (
                        <td key={fieldIndex} className={"text-center   py-4"}>
                          {_.get(row, field, "")}
                        </td>
                      ) : (
                        field?.(row, index)
                      )
                    )}
                </tr>
              );
            })
          )}
        </tbody>
        {/* <tfoot className=' bg-gray-50 dark:bg-gray-800 sticky bottom-0 hidden'>
          {renderColumns?.({}) ?? (
            <tr>
              {Object.keys(data.rows[0])
                .filter((field) => !_.isObject(data.rows[0][field]))
                .map((field) => (
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap'
                  >
                    {_.startCase(field)}
                  </th>
                ))}
            </tr>
          )}
        </tfoot> */}
      </table>
    </div>
  );
};

export default TableBodyComponent;
