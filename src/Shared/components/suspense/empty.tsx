import { FC } from "react";
import EmptyStateIcon from "../icons/empty-state-icon";
import { EmptyBidImage, EmptyStarImage, EmptyTaskImage } from "assets";

const EmptyTypes = ["star", "task", "document", "bid"] as const;
type EmptyType = (typeof EmptyTypes)[number];

interface EmptyComponentProps {
  title?: string;
  subTitle?: string;
  emptyIcon?: JSX.Element;
  emptyType?: EmptyType;
}

const EmptyImages: { [key in EmptyType]: typeof EmptyStarImage } = {
  star: EmptyStarImage,
  task: EmptyTaskImage,
  bid: EmptyBidImage,
  document: EmptyStarImage,
};

const EmptyComponent: FC<EmptyComponentProps> = ({
  title,
  emptyIcon,
  subTitle,
  emptyType,
}) => {
  return (
    <div className='pb-[60px]  items-center justify-center flex'>
      <div className='text-center'>
        {emptyType ? (
          <img
            src={EmptyImages[emptyType]}
            alt={emptyType}
            className='mx-auto w-[160px]'
          />
        ) : (
          <div className='mx-auto w-min'>{emptyIcon || <EmptyStateIcon />}</div>
        )}
        <h3 className=' text-center text-zinc-800 text-lg font-bold '>
          {" "}
          No {title || "documents"}
        </h3>
        <p className=' text-center text-neutral-500   font-normal'>
          {" "}
          {subTitle || `Get started by creating a new ${title || "document"}`}
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

export default EmptyComponent;
