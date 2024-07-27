import { FC } from "react";
import EmptyStateIcon from "../icons/empty-state-icon";

interface TableEmptyComponentProps {
  title?: string;
  emptyTitle?: string;
  emptyIcon?: JSX.Element;
}

const TableEmptyComponent: FC<TableEmptyComponentProps> = ({
  title,
  emptyTitle,
  emptyIcon,
}) => {
  return (
    <div className='min-h-[300px] items-center justify-center flex'>
      <div className='text-center'>
        <div className='mx-auto w-min'>{emptyIcon || <EmptyStateIcon />}</div>
        <h3 className=' text-center text-zinc-800 text-lg font-bold '>
          {" "}
          {emptyTitle || `No ${title || "documents"}`}
        </h3>
        <p className=' text-center text-neutral-500   font-normal'>
          {" "}
          {/* {subTitle || `Get started by creating a new ${title || "document"}`} */}
        </p>
        {/* <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Project
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TableEmptyComponent;
