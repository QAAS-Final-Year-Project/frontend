import PrimaryButton from "Shared/components/buttons/primary-button";
import PrimaryChip from "Shared/components/chips/primary-chip";
import TextInput from "Shared/components/input/text-input";
import Container from "Shared/components/layout/container";
import { classNames } from "Shared/utils/ui";
import { HomeBackgroundImage } from "assets";
import React, { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <section className=''>
      <div className={`intro-banner pt-[105px]`}>
        <Container className='z-[100] relative'>
          <h3 className='leading-[42px] mb-12'>
            <strong className='text-zinc-800 text-[28px] font-semibold  leading-[42px]'>
              Hire experts or be hired for any job, any time.
              <br />
            </strong>
            <span className='text-neutral-500 text-[28px] font-light  leading-[42px]'>
              Thousands of small businesses use{" "}
            </span>
            <span className='text-blue-700 text-[28px] font-semibold  leading-[42px]'>
              Test Universal
            </span>
            <span className='text-neutral-500 text-[28px] font-light  leading-[42px]'>
              {" "}
              to turn
              <br />
              their ideas into reality.
            </span>
          </h3>
          <div className='grid grid-cols-2 w-full'>
            <div>
              <PrimaryChip text='Where?' />
              <TextInput
                id='location'
                inputClassName='border-transparent border-r-neutral-200 !rounded-none h-[68px]'
                type='text'
                label=''
                placeholder='Online Job'
                handleBlur={() => {}}
                handleChange={() => {}}
                values={{}}
              />
            </div>
            <div>
              <PrimaryChip text='What job you want??' />
              <TextInput
                id='search'
                inputClassName='!border-none !border-r  !border-neutral-200 !rounded-none h-[68px]'
                label=''
                postText={<PrimaryButton text='Search' />}
                placeholder='Job Title or Keywords'
                handleBlur={() => {}}
                handleChange={() => {}}
                values={{}}
              />
            </div>
          </div>

          <div className='   flex items-center gap-x-9 mt-[45px]'>
            <div>
              <p className='text-zinc-800 text-[28px] font-semibold  leading-[27px]'>
                3,543{" "}
              </p>{" "}
              <span className='text-zinc-500 text-lg font-light  leading-[27px]'>
                Jobs Posted{" "}
              </span>{" "}
            </div>

            <div className='w-0.5 bg-neutral-200 h-14'></div>
            <div>
              <p className='text-zinc-800 text-[28px] font-semibold  leading-[27px]'>
                3,543{" "}
              </p>{" "}
              <span className='text-zinc-500 text-lg font-light  leading-[27px]'>
                Tasks Posted{" "}
              </span>{" "}
            </div>

            <div className='w-0.5 bg-neutral-200 h-14'></div>
            <div>
              <p className='text-zinc-800 text-[28px] font-semibold  leading-[27px]'>
                1,232{" "}
              </p>{" "}
              <span className='text-zinc-500 text-lg font-light  leading-[27px]'>
                Freelancers{" "}
              </span>{" "}
            </div>
          </div>
        </Container>
        <div
          className='background-image-container'
          style={{ backgroundImage: `url(${HomeBackgroundImage})` }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
