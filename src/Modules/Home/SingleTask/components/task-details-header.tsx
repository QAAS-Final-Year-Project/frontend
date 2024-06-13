import { CheckIcon } from "@heroicons/react/24/outline";
import OwnerCountry from "Shared/components/intl/owner-country";
import Container from "Shared/components/layout/container";
import RatingComponent from "Shared/components/status/rating";
import { HomeBackgroundImage, SingleTaskImage } from "assets";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const TaskDetailsHeader: FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <div className='relative mb-16 py-16 task-header'>
        <Container className='z-[100] relative'>
          <div className='flex flex-col'>
            <div className='flex'>
              <div className='flex flex-1 items-center pr-8'>
                <div className='flex-none bg-white rounded shadow-md p-5 h-36 w-36 mr-8 flex items-center'>
                  <Link
                    to={"/developers/" + data?.createdBy?._id}
                    className='transition-all ease-in-out text-blue-700 flex h-full outline-none'
                  >
                    <img
                      src={
                        data?.createdBy?.profileImageUrl ||
                        "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image-300x300.png"
                      }
                      className='max-w-full self-center transform'
                    />
                  </Link>
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-800 text-2xl mb-3'>
                    {data?.title}
                  </h3>
                  <h5 className='font-semibold text-gray-800 text-lg'>
                    About the Employer
                  </h5>
                  <ul className='list-none p-0 m-0'>
                    <li className='inline-block mr-5 mb-3'>
                      <Link
                        to={"/developers/" + data?.createdBy?._id}
                        className='transition-all ease-in-out text-gray-600 outline-none'
                      >
                        <i className='icon-material-outline-business mr-1 text-xl relative top-0.5' />{" "}
                        {data?.createdBy?.organizationName ||
                          data?.createdBy?.fullName}
                      </Link>
                    </li>
                    <li className='inline-block mr-5 mb-3'>
                      {data?.createdBy?.rating ? (
                        <RatingComponent rating={data?.createdBy?.rating} />
                      ) : (
                        <div className=' text-stone-500 bg-zinc-200 px-[9px] py-[5px] mt-2 mb-5 !text-sm inline-flex rounded items-center justify-center'>
                          Not Rated
                        </div>
                      )}
                    </li>
                    <li className='inline-block mr-5 mb-3'>
                      <OwnerCountry
                        country={data?.createdBy?.country}
                        showText={true}
                      />{" "}
                    </li>
                    {data?.createdBy?.meta?.isVerified && (
                      <li className='inline-block mb-3'>
                        <div className='bg-green-600 text-white text-sm font-medium rounded   flex items-stretch'>
                          <div className=' justify-center items-center inline-flex bg-green-500 px-2 rounded-l'>
                            <CheckIcon className='text-white w-3 h-3' />
                          </div>
                          <div className='py-1  px-2'>Verified</div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className='flex flex-1 items-center max-w-xs'>
                <div className='bg-white rounded shadow-md p-5 ml-auto'>
                  <div className='text-gray-500 mb-2'>Project Budget</div>
                  <div className='text-gray-800 text-3xl font-light'>
                    ${data?.amount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div
          className='background-image-container'
          style={{ backgroundImage: `url(${SingleTaskImage})` }}
        ></div>
      </div>
    </>
  );
};

export default TaskDetailsHeader;
