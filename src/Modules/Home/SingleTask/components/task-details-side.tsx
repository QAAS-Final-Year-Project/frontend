import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import SendMessageContainer from "Modules/Developer/Tasks/send-message";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RangeInput from "Shared/components/input/range-input";
import TextInput from "Shared/components/input/text-input";
import { getTimeLeft } from "Shared/utils/date";
import { classNames, wrapClick } from "Shared/utils/ui";
import { useFormik } from "formik";
import moment from "moment";
import React, { FC } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PlaceBidContainer from "../place-bid";
import useUrlState from "Shared/hooks/use-url-state";
import useCookies from "Shared/hooks/cookies";
import BookmarkButton from "Shared/components/buttons/bookmark-btn";
import { useMutation } from "@tanstack/react-query";
import {
  doAddBookMark,
  doDeleteBookmark,
} from "Modules/Tester/Bookmarks/duck/fetch";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import { isValidJSON } from "Shared/utils/data-structures";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import { Tooltip } from "react-tooltip";

const TaskDetailsSide: FC<{
  data: any;
  refetch: () => {};
  isRefetching: boolean;
}> = ({ data, refetch, isRefetching }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, setModal] = useUrlState("modal");
  const [current, setCurrent] = useUrlState("current");
  const [token] = useCookies("token");
  const navigate = useNavigate();
  const [user, setUser] = useCookies("user");

  const currentUser = isValidJSON(user) ? JSON.parse(user) : undefined;

  const dispatchAction = (
    id: string,
    action: "delete" | "accept" | "message" | "bid"
  ) => {
    searchParams.set("modal", action);
    searchParams.set("current", id);
    setSearchParams(searchParams);
  };
  const form = useFormik<any>({
    initialValues: {
      rate: data?.amount,
    },
    onSubmit: async (values) => {},
    onReset: () => {},
  });

  const bookmarkMutation = useMutation({
    mutationFn: doAddBookMark,
    onSuccess: (response) => {
      refetch();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const removeBookmarkMutation = useMutation({
    mutationFn: doDeleteBookmark,
    onSuccess: (response) => {
      refetch();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  return (
    <div>
      <div className='rounded p-3 w-full text-center text-lg leading-7 bg-emerald-50 text-green-600 mb-[35px]'>
        {getTimeLeft(moment(data?.deadlineDate))} left
      </div>
      <div>
        <div className='rounded-t  bg-zinc-100  py-5 px-[35px]  text-zinc-800 text-xl font-medium leading-[27px]'>
          <h3 className='font-medium m-0'>Bid on this job!</h3>
        </div>
        {!data?.bidders?.find(
          (bidder) => bidder?.bidder?._id === currentUser?._id
        ) ? (
          <div className='flex flex-col items-start py-[30px] px-[35px] bg-stone-50'>
            <p className='mb-[5px]'>
              <span className='text-zinc-500 text-base font-normal  leading-[27px]'>
                Set your{" "}
              </span>
              <span className='text-zinc-800 text-base font-bold  leading-[27px]'>
                minimal rate
              </span>
            </p>
            <h6 className='text-zinc-800 text-[26px] font-medium  leading-[27px] flex items-center gap-x-0.5'>
              $
              <TextInput
                id='rate'
                label=''
                labelHidden
                step={1}
                type='number'
                max={data?.amount}
                required={false}
                disabled
                rootClassName='!inline-block '
                inputClassName='!border-none !focus-none !bg-transparent !shadow-none !p-0 !py-0 !text-[26px]'
                {...form}
              />
            </h6>
            <div className='mt-6 mb-8 w-full'>
              <RangeInput
                id='rate'
                labelHidden
                min={1}
                max={data?.amount}
                {...form}
              />
            </div>
            {/* <p className='mb-3'>
              <span className='text-zinc-500 text-base font-normal  leading-[27px]'>
                Set your{" "}
              </span>
              <span className='text-zinc-800 text-base font-bold  leading-[27px]'>
                delivery time
              </span>
            </p>
            <div className='grid grid-cols-2 gap-5 w-full mb-[30px]'>
              <div className='p-1.5 bg-white rounded shadow  flex items-center'>
                <div className='w-9 h-9 p-[9px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded flex items-center justify-center'>
                  <MinusIcon className='w-[18px h-[18px] ' />
                </div>
                <div className=' flex-1 text-center text-zinc-500 text-base font-semibold leading-9'>
                  1
                </div>
                <div className='w-9 h-9 p-[9px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded flex items-center justify-center'>
                  <PlusIcon className='w-[18px h-[18px] ' />
                </div>
              </div>
              <div className='px-5 bg-white rounded shadow  justify-center flex items-center'>
                <span className=' text-zinc-500 text-base font-medium text-center  leading-[48px]'>
                  Days
                </span>
              </div>
            </div> */}
            <PrimaryButton
              text='Place Bid'
              className='w-full'
              onClick={wrapClick(() =>
                !!token
                  ? dispatchAction(data?._id, "bid")
                  : navigate("/login", {})
              )}
            />
          </div>
        ) : (
          <div>
            <div className='flex flex-col items-start py-[30px] px-[35px] bg-stone-50'>
              <p className='mb-[22px]'>
                <span className='text-zinc-500 text-base font-normal  leading-[27px]'>
                  You have already placed a bid on this job
                </span>
              </p>
              <SecondaryButton
                text='Revoke Bid'
                className='w-full'
                onClick={wrapClick(() => dispatchAction(data?._id, "delete"))}
              />
            </div>
          </div>
        )}
        {!currentUser && (
          <div className='border-t border-neutral-200 bg-stone-50 py-4'>
            <div className=' flex items-center justify-center gap-1  '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                Don't have an account?
              </span>
              <Link
                to='/register'
                className='text-center text-blue-700 text-base font-medium  leading-[27px]  '
              >
                Sign Up!{" "}
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='space-y-5'>
        <h6 className='mt-[50px] text-zinc-800 text-xl font-medium  leading-[27px]'>
          Bookmark or Share
        </h6>
        <BookmarkButton
          bookmarked={!!data?.bookmark}
          isLoading={
            bookmarkMutation.isPending ||
            removeBookmarkMutation.isPending ||
            isRefetching
          }
          onBookmarkRemove={() => removeBookmarkMutation.mutate(data?.bookmark)}
          onBookmark={() => {
            bookmarkMutation.mutate({
              type: "Task",
              task: data?._id,
            });
          }}
        />
        <div className='flex items-stretch w-full'>
          <div className='flex-1'>
            <TextInput
              id='link'
              type='text'
              labelHidden
              inputClassName='rounded-r-none'
              label=''
              readonly
              placeholder={window.location.href}
              handleBlur={() => {}}
              handleChange={() => {}}
              values={{}}
            />
          </div>
          <button
            type='button'
            className={classNames(
              " text-white my-auto bg-primary-500 flex items-center justify-center  cursor-pointer",
              "h-12 w-11  rounded-r  "
            )}
          >
            <Icon icon='ic:outline-file-copy' className='w-5 h-5 ' />
          </button>
        </div>
        <div className=' flex items-center gap-x-2.5 group relative'>
          <div className='w-11 h-11 px-[13px] pt-3 pb-3.5 bg-zinc-100 rounded justify-start items-start inline-flex'>
            <div className='justify-start items-start flex'>
              <Icon
                icon={"ic:outline-share"}
                className='w-[18px] h-[18px] text-zinc-500'
              />
            </div>
          </div>
          <p>
            <span className='text-zinc-500 text-base font-normal  leading-[27px]'>
              Interesting?{" "}
            </span>
            <span className='text-blue-700 text-base font-semibold  leading-[27px]'>
              Share It!
            </span>
          </p>
          <div className='flex absolute left-0  opacity-0 group-hover:opacity-100 transition-all  group-hover:left-[55px] items-center  justify-self-end  '>
            <FacebookShareButton url={window.location.href}>
              <Tooltip anchorSelect={`#facebook-share`}>
                {"Share on Facebook"}
              </Tooltip>
              <div
                className='bg-[#3B5998] w-[44px] h-[44px] rounded-l flex items-center justify-center'
                id='facebook-share'
              >
                <Icon icon={"mdi:facebook"} className='w-4 h-4 text-white' />
              </div>
            </FacebookShareButton>
            <LinkedinShareButton url={window.location.href}>
              <Tooltip anchorSelect={`#linkedin-share`}>
                {"Share on Linkedin"}
              </Tooltip>
              <div
                className=' bg-[#0077B5] w-[44px] h-[44px] flex items-center justify-center  '
                id='linkedin-share'
              >
                <Icon icon={"mdi:linkedin"} className='w-4 h-4 text-white' />
              </div>
            </LinkedinShareButton>

            <TwitterShareButton url={window.location.href}>
              <Tooltip anchorSelect={`#twitter-share`}>
                {"Share on Twitter"}
              </Tooltip>
              <div
                className='bg-[rgb(29,161,242)] w-[44px] h-[44px]  flex   items-center justify-center '
                id='twitter-share'
              >
                <Icon icon={"mdi:twitter"} className='w-4 h-4 text-white' />
              </div>
            </TwitterShareButton>
            <RedditShareButton url={window.location.href}>
              <Tooltip anchorSelect={`#reddit-share`}>
                {"Share on Reddit"}
              </Tooltip>
              <div
                className='bg-[#AE2C00] w-[44px] h-[44px] rounded-r flex   items-center justify-center '
                id='reddit-share'
              >
                <Icon icon={"mdi:reddit"} className='w-4 h-4 text-white' />
              </div>
            </RedditShareButton>
          </div>{" "}
        </div>
      </div>
      <PlaceBidContainer
        values={form.values}
        open={modal === "bid"}
        setOpen={(val: boolean) => setModal(val ? "bid" : undefined)}
        refetch={refetch}
      />
    </div>
  );
};

export default TaskDetailsSide;
