import { CheckIcon } from "@heroicons/react/24/outline";
import OwnerCountry from "Shared/components/intl/owner-country";
import Container from "Shared/components/layout/container";
import Avatar from "Shared/components/media/avatar";
import RatingComponent from "Shared/components/status/rating";
import {  SingleTesterImage } from "assets";
import React, { FC } from "react";

const TesterDetailsHeader: FC<{ data: any }> = ({ data }) => {
  return (
    <>
      <div className='relative  py-16 task-header'>
        <Container className='z-[100] relative'>
          <div className='flex flex-col'>
            <div className='flex'>
              <div className='flex flex-1 items-center'>
                <div className='mr-[35px]'>
                  <Avatar
                    alt={data?.fullName}
                    src={data?.profileImageUrl}
                    size='home'
                  />
                </div>

                <div className='flex-1'>
                  <h3 className='text-zinc-800 text-[26px] font-medium  leading-9'>
                    {data?.fullName}
                  </h3>
                  <div className='text-zinc-500 text-xl font-light  leading-9 mb-[18px]'>
                    {data?.type}
                  </div>
                  <ul className='list-none flex items-center  p-0 m-0 gap-x-6'>
                    <li className='inline-block '>
                      {data?.rating ? (
                        <RatingComponent rating={data?.rating} />
                      ) : (
                        <div className=' text-stone-500 bg-zinc-200 px-[9px] py-[5px]  !text-sm inline-flex rounded items-center justify-center'>
                          Not Rated
                        </div>
                      )}
                    </li>
                    <li className='inline-block '>
                      <OwnerCountry country={data?.country} showText={true} />{" "}
                    </li>
                    {data?.meta?.isVerified && (
                      <li className='inline-block '>
                        <div className='bg-green-600 text-white text-sm font-medium rounded   flex items-stretch'>
                          <div className=' justify-center items-center inline-flex bg-green-500 px-2 rounded-l'>
                            <CheckIcon className='text-white w-4 h-4' />
                          </div>
                          <div className='py-1  px-2'>Verified</div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
        
            </div>
          </div>
        </Container>
        <div
          className='background-image-container'
          style={{ backgroundImage: `url(${SingleTesterImage})` }}
        ></div>
      </div>
    </>
  );
};

export default TesterDetailsHeader;
