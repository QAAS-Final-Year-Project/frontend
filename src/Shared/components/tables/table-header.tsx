import { FC, isValidElement, ReactNode, useEffect } from "react";
import { ExportButton } from "./export-btn";
import TextInput from "../input/text-input";
import { useFormik } from "formik";
import { classNames, wrapClick } from "Shared/utils/ui";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useUrlState from "Shared/hooks/use-url-state";
import _ from "lodash";
import OutlinedButton from "../buttons/outline-button";
import CardSectionWrapper from "../wrapper/CardSectionWrapper";

interface TableHeaderComponentProps {
  hideExportButtons?: boolean;
  isRefetching?: boolean;
  mini?: boolean;
  hasSearch?: boolean;
  title?: string;
  onExportClicked?: (type: "excel" | "csv" | "pdf") => void;
  exportDownloading?: "excel" | "csv" | "pdf";
  refetch: () => void;
}
const TableHeaderComponent: FC<TableHeaderComponentProps> = ({
  hideExportButtons,
  exportDownloading,
  title,
  onExportClicked,
  isRefetching,
  refetch,
  mini,
  hasSearch,
}) => {
  const [search, setSearch] = useUrlState<string>("search");
  const form = useFormik<any>({
    initialValues: {
      search: search,
    },
    onSubmit: async (values) => {
      setSearch(values.search);
    },
    onReset: () => {},
  });
  return (
    <div
      className={classNames(
        " bg-white rounded shadow border-b border-neutral-200",
      )}
    >
      <div className='px-5 pt-2 pb-5 border-b border-neutral-200 flex items-center justify-between'>
        <h4 className='flex gap-3 items-center text-zinc-800 text-base font-medium  leading-relaxed'>
          <h1 className='text-xl text-zinc-800 font-medium leading-none my-2 flex items-center gap-1'>
            <div className={"h-2 w-2 bg-yellow-500 rounded-full mr-1"} />
            {title}
          </h1>{" "}
        </h4>
        <div className='flex  justify-center gap-x-3 mt-3 items-center'>
      {hasSearch &&  
      
      <><div className='max-w-80'>
            <TextInput
              type='search'
              labelHidden
              placeholder={"Search"}
              id='search'
              {...form}
              handleChange={(e) => {
                if (!e?.target?.value) {
                  setSearch(undefined);
                }
                form.handleChange(e);
              }}
            />
          </div>

          <button
            type='button'
            onClick={wrapClick(() => setSearch(form.values?.search))}
            className='bg-white border dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-2.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
          >
            <MagnifyingGlassIcon
              className={classNames("h-5 w-5")}
              aria-hidden='true'
            />
            <span className='sr-only'>Refresh</span>
          </button>
          </>}
          <button
            type='button'
            onClick={wrapClick(refetch)}
            className='bg-white border dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-900  p-2.5 rounded-md shadow-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
          >
            <ArrowPathIcon
              className={classNames(
                isRefetching ? "animate-spin" : "animate-none",
                "h-5 w-5"
              )}
              aria-hidden='true'
            />
            <span className='sr-only'>Refresh</span>
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default TableHeaderComponent;

{
  /* {!hideExportButtons ? (
          <div className={"flex items-center gap-4"}>
            <ExportButton
              type={"excel"}
              exportDownloading={exportDownloading}
              onExportClicked={onExportClicked}
            />
            <ExportButton
              type={"csv"}
              exportDownloading={exportDownloading}
              onExportClicked={onExportClicked}
            />
            <ExportButton
              type={"pdf"}
              exportDownloading={exportDownloading}
              onExportClicked={onExportClicked}
            />
          </div>
        ) : (
          <div></div>
        )} */
}
