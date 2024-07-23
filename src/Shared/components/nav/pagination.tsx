import _ from "lodash";
import numeral from "numeral";
import { FC } from "react";
import AppConfig from "../../../config";
import { classNames, wrapClick } from "../../utils/ui";
import useUrlState from "Shared/hooks/use-url-state";
import { Icon } from "@iconify/react";
import lodash from "lodash";

interface PaginationComponentProps<TData = any> {
  data: {
    rows: TData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  hideDirectionControls?: boolean;
}

const PaginationComponent: FC<PaginationComponentProps> = ({ data , hideDirectionControls}) => {
  const [page, setPage] = useUrlState("page");
  const [pageSize] = useUrlState("pageSize");
  const setNextPage = () =>
    setPage((_.toNumber(page) || AppConfig.constants.pageSize) + 1);
  const setPreviousPage = () =>
    setPage((_.toNumber(page) || AppConfig.constants.pageSize) - 1);
  const nextEnabled =
    (_.toNumber(page) || AppConfig.constants.pageSize) <
    (data?.totalPages || 0);
  const previousEnabled =
    (_.toNumber(page) || AppConfig.constants.pageSize) > 1;
  const startIndex =
    ((data?.page ?? (_.toNumber(page) || AppConfig.constants.page)) - 1) *
      (data?.pageSize ??
        (_.toNumber(pageSize) || AppConfig.constants.pageSize)) +
    1;
  const endIndex = _.min([
    (data?.page ?? (_.toNumber(page) || AppConfig.constants.page)) *
      (data?.pageSize ??
        (_.toNumber(pageSize) || AppConfig.constants.pageSize)),
    data?.total || Number.MAX_SAFE_INTEGER,
  ]);
  return (
    <nav
      className={classNames(
        " dark:bg-gray-800 px-4 py-2 flex items-center justify-between   -mx",
        "justify-self-end flex-shrink-0  "
      )}
      aria-label='Pagination'
    >
      <div className='flex-1 flex justify-between sm:justify-center mb-4 gap-x-2'>
        {!hideDirectionControls && (
     <button
     type='button'
     disabled={!previousEnabled}
     onClick={wrapClick(setPreviousPage)}
     className={classNames(
       previousEnabled
         ? "bg-zinc-100   hover:text-white  dark:bg-gray-800 hover:bg-[#333] hover:dark:bg-gray-900 cursor-pointer"
         : "cursor-not-allowed bg-zinc-200 dark:bg-gray-900 opacity-60",
       "w-11 h-11 px-2.5 rounded text-zinc-800 "
     )}
   >
     <Icon icon='akar-icons:chevron-left' className='w-5 h-5 ' />
   </button>
        )}
   
        {lodash.times(data.totalPages, (index) => {
          const pageNumber = index + 1;
          return (
            <button
              type='button'
              onClick={wrapClick(() => setPage(pageNumber))}
              className={classNames(
                "w-11 h-11 px-2.5 rounded   text-center font-bold  leading-[44px] text-sm cursor-pointer",
                page == pageNumber
                  ? " text-white bg-primary-500"
                  : "text-zinc-800 bg-transparent hover:text-white hover:bg-zinc-800 "
              )}
            >
              {pageNumber}
            </button>
          );
        })}
                {!hideDirectionControls && (

        <button
          type='button'
          disabled={!nextEnabled}
          onClick={wrapClick(setNextPage)}
          className={classNames(
            nextEnabled
              ? "bg-zinc-100   hover:text-white  dark:bg-gray-800 hover:bg-[#333] hover:dark:bg-gray-900 cursor-pointer"
              : "cursor-not-allowed bg-zinc-200 dark:bg-gray-900  opacity-60",
            "w-11 h-11 px-2.5 rounded text-zinc-800 "
          )}
        >
          <Icon icon='akar-icons:chevron-right' className='w-5 h-5 ' />
        </button>
              )}
      </div>
    </nav>
  );
};

export default PaginationComponent;
