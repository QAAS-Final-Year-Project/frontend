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
import TesterJobStatistic from "./tester-job-statistic";
import IconButton from "Shared/components/buttons/icon-button";
import { getRandomWholeNumberIRange } from "Shared/utils/numbers";
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
      <div className='flex items-center gap-x-5 mb-[25px]'>
        <div>
          <p className=' text-zinc-800 text-lg font-semibold  leading-snug mb-[4.75px]'>
            ${getRandomWholeNumberIRange(20, 100)}
          </p>
          <div className='text-zinc-500 text-base font-normal  leading-snug'>
            Hourly Rate
          </div>
        </div>
        <div className='w-[1px] bg-neutral-200 h-10'></div>
        <div>
          <p className=' text-zinc-800 text-lg font-semibold  leading-snug mb-[4.75px]'>
            {getRandomWholeNumberIRange(33, 53)}
          </p>
          <div className='text-zinc-500 text-base font-normal  leading-snug'>
            Jobs Done
          </div>
        </div>
        <div className='w-[1px] bg-neutral-200 h-10'></div>
        <div>
          <p className=' text-zinc-800 text-lg font-semibold  leading-snug mb-[4.75px]'>
            {getRandomWholeNumberIRange(20, 1000)}
          </p>
          <div className='text-zinc-500 text-base font-normal  leading-snug'>
            Rehired
          </div>
        </div>
      </div>
      <PrimaryButton
        text='Send Message'
        onClick={wrapClick(() => navigate("/dashboard/messages"))}
        icon={"ic:baseline-arrow-right-alt"}
        iconPosition='right'
        className='w-full rounded-none mb-[50px]'
      />
      <div className='grid grid-cols-2 gap-y-5 gap-x-[30px] mb-[50px]'>
        <TesterJobStatistic
          label='Job Success'
          percentage={getRandomWholeNumberIRange(40, 90)}
        />
        <TesterJobStatistic
          label='Recommendation'
          percentage={getRandomWholeNumberIRange(40, 100)}
        />
        <TesterJobStatistic
          label='On Time'
          percentage={getRandomWholeNumberIRange(40, 90)}
        />
        <TesterJobStatistic
          label='On Budget'
          percentage={getRandomWholeNumberIRange(40, 80)}
        />
      </div>

      <div className='mb-[50px]'>
        <div className=" text-zinc-800 text-xl font-medium  leading-[27px] mb-[23px]">
          Social Profiles
        </div>
        <div className='flex items-center gap-x-5'>
          <IconButton
            disabled={!data?.socialLinks?.twitter}
            iconClassName='text-zinc-400 w-[30px] h-[30px]'
            size='md'
            icon={"mdi:twitter"}
            onClick={wrapClick(() => window.open(data?.socialLinks?.twitter))}
          />
          <IconButton
            disabled={!data?.socialLinks?.linkedIn}
            icon={"mdi:linkedin"}
            iconClassName='text-zinc-400 w-[30px] h-[30px]'
            size='sm'
            onClick={wrapClick(() => window.open(data?.socialLinks?.linkedIn))}
          />
          <IconButton
            disabled={!data?.socialLinks?.github}
            icon={"mdi:github"}
            iconClassName='text-zinc-400 w-[30px] h-[30px]'
            size='sm'
            onClick={wrapClick(() => window.open(data?.socialLinks?.github))}
          />
          <IconButton
            disabled={!data?.socialLinks?.website}
            icon={"ic:baseline-language"}
            iconClassName='text-zinc-400 w-[30px] h-[30px]'
            size='sm'
            onClick={wrapClick(() => window.open(data?.socialLinks?.website))}
          />
        </div>
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
              <Tooltip anchorSelect={`#facebook-share`} >
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
            <Tooltip anchorSelect={`#linkedin-share`} >
                {"Share on Linkedin"}
              </Tooltip>
              <div className=' bg-[#0077B5] w-[44px] h-[44px] flex items-center justify-center  ' id="linkedin-share">
                <Icon icon={"mdi:linkedin"} className='w-4 h-4 text-white' />
              </div>
            </LinkedinShareButton>

            <TwitterShareButton url={window.location.href}>
            <Tooltip anchorSelect={`#twitter-share`} >
                {"Share on Twitter"}
              </Tooltip>
              <div className='bg-[rgb(29,161,242)] w-[44px] h-[44px]  flex   items-center justify-center ' id="twitter-share">
                <Icon icon={"mdi:twitter"} className='w-4 h-4 text-white' />
              </div>
            </TwitterShareButton>
            <RedditShareButton url={window.location.href}>
            <Tooltip anchorSelect={`#reddit-share`} >
                {"Share on Reddit"}
              </Tooltip>
              <div className='bg-[#AE2C00] w-[44px] h-[44px] rounded-r flex   items-center justify-center ' id="reddit-share">
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
