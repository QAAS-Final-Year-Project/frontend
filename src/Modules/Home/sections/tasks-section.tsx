import Container from "Shared/components/layout/container";
import React, { FC, useEffect, useRef } from "react";
import SectionTitle from "../components/section-title";
import { Icon } from "@iconify/react";
import { classNames, wrapClick } from "Shared/utils/ui";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { Query, useQuery } from "@tanstack/react-query";
import { getRecommendedTasks } from "../duck/fetch";
import Loader from "Shared/components/suspense/loader";
import HomeTaskRow from "../components/home-task-row";

export const HomeTasksSection: FC = () => {
  const {
    data: queryData,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["recommended-tasks"],
    queryFn: () => getRecommendedTasks(),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  return (
    <section className='bg-stone-50'>
      <Container className=' pt-[65px] pb-[75px]'>
        <div className='flex items-center justify-between mb-[35px]'>
          <SectionTitle text={"Recommended Tasks"} />
          <Link
            to={"/tasks"}
            className='text-blue-700 text-base font-normal  leading-[27px] hover:text-primary-400 flex items-center justify-center gap-1'
          >
            Browse All Tasks
            <Icon icon={"ic:baseline-arrow-forward"} className='h-5 w-5' />
          </Link>
        </div>
        <div className=' bg-white rounded shadow flex flex-col w-full'>
          {isLoading && (
            <div className='min-h-[400px] flex items-center justify-center'>
              <Loader />
            </div>
          )}
          {queryData?.data?.data?.length > 0 ? (
            queryData?.data?.map((task, idx) => (
              <HomeTaskRow
                _id={task._id}
                idx={idx}
                date={task.createdAt}
                price={task?.amount}
                tags={task?.tags}
                title={task?.title}
                key={task._id}
              />
            ))
          ) : (
            <div className='flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                No Tasks Found
              </h2>
              <p className='text-gray-600 text-center max-w-md'>
                It looks like there are no available tasks at the moment. Check
                back later 
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HomeTasksSection;
