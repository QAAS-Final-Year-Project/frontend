import { classNames } from "Shared/utils/ui";
import lodash from "lodash";

const SingleShimmer = ({
  outerHeight,
  innerHeight,
  className,
}: {
  outerHeight?: string;
  innerHeight?: string;
  className?:string
}) => (
  <div
    className={classNames(
      "w-full space-y-2   justify-center flex flex-col",
      outerHeight ? outerHeight : "h-7",
    )}
  >
    <div
      className={classNames(
        "bg-gray-300 dark:bg-gray-400 h-3 rounded w-full animate-pulse",
        innerHeight ? innerHeight : "h-3",
        className

      )}
    />
  </div>
);

const DoubleShimmer = () => (
  <div className='w-full space-y-2 min-w-[120px] h-10  justify-center flex flex-col'>
    <div className='bg-gray-300 dark:bg-gray-400 h-3 rounded w-full animate-pulse' />
    <div className='bg-gray-200 dark:bg-gray-400 h-3 rounded w-2/3 animate-pulse' />
  </div>
);

const AvatarShimmer = () => (
  <div className='flex space-x-3 items-center h-10'>
    <div className='bg-gray-300 dark:bg-gray-400 h-10 rounded-full w-10 animate-pulse' />
    <div className='flex-1 space-y-2 min-w-[120px]'>
      <div className='bg-gray-400 dark:bg-gray-400 h-3 rounded w-full animate-pulse' />
      <div className='bg-gray-300 dark:bg-gray-400 h-3 rounded w-2/3 animate-pulse' />
    </div>
  </div>
);

const ActionsShimmer = ({ actionsCount }: { actionsCount: number }) => (
  <div className='flex space-x-1 h-10 items-center'>
    {lodash.times(actionsCount, (idx) => (
      <div
        key={idx}
        className='odd:bg-gray-400 even:bg-gray-300 dark:bg-gray-400 h-6 rounded-full w-6 animate-pulse'
      />
    ))}
  </div>
);

const Shimmers = {
  SingleShimmer,
  DoubleShimmer,
  AvatarShimmer,
  ActionsShimmer,
};
export default Shimmers;
