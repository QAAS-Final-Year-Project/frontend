import { FC } from "react";
import { classNames, wrapClick } from "Shared/utils/ui";
import { StarIcon } from "@heroicons/react/20/solid";
import LoadingIcon from "../icons/loading-icon";

const BookmarkButton: FC<{
  bookmarked: boolean;
  onBookmark: () => void;
  onBookmarkRemove: () => void;
  isLoading?: boolean;
}> = ({ bookmarked, onBookmark, onBookmarkRemove, isLoading }) => {
  return (
    <button
      type='button'
      disabled={isLoading}
      onClick={wrapClick(() =>
        bookmarked ? onBookmarkRemove() : onBookmark()
      )}
      className={classNames(
        " text-sm font-medium rounded items-stretch  text-white  flex w-min h-11",
        bookmarked ? "bg-amber-400" : "bg-neutral-700"
      )}
    >
      <div
        className={classNames(
          " justify-center items-center  flex  px-3.5 rounded-l",
          bookmarked ? "bg-white/20" : "bg-white/5"
        )}
      >
        <StarIcon className=' w-5 h-5' />
      </div>
      <div className=' text-center text-base font-normal flex items-center justify-center  leading-[44px] px-4'>
        {isLoading ? (
          <LoadingIcon
            className={`animate-spin h-5 w-5 mx-2 fill-white ${
              isLoading ? "block" : "hidden"
            }`}
          />
        ) : bookmarked ? (
          "Bookmarked"
        ) : (
          "Bookmark"
        )}
      </div>{" "}
    </button>
  );
};

export default BookmarkButton;
