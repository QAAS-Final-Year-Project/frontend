import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import { classNames, wrapClick } from "Shared/utils/ui";
import VideoSectionComponent from "../components/video-section-component";
import { learningVideosData } from "../data";
import { Navigation } from "swiper/modules";
import "swiper/css";
import SectionTitle from "Modules/Home/components/section-title";

export const LearningMaterialsVideoSection: FC<{
  slideWidth: number;
}> = ({ slideWidth }) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  const handlePrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.swiper.isBeginning);
      setIsEnd(swiperRef.current.swiper.isEnd);
    }
  };

  useEffect(() => {
    console.log(slideWidth);
  }, [slideWidth]);

  return (
    <section className='w-full'>
     
      <div
        className='!px-[0px] !mx-[0px] !w-full '
        style={{
          maxWidth: slideWidth || "1200px",
        }}
      >
        <div className='flex items-center w-full gap-x-[50px]'>
          <button
            type='button'
            onClick={wrapClick(handlePrev)}
            className={classNames(
              "text-white dark:bg-gray-800 bg-[#333]  hover:dark:bg-gray-900",
              "w-11 h-11 px-2.5 rounded",
              isBeginning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-500 cursor-pointer"
            )}
            disabled={isBeginning}
          >
            <Icon icon='akar-icons:chevron-left' className='w-5 h-5' />
          </button>

          <Swiper
            slidesPerView={3}
            ref={swiperRef}
            speed={600}
            spaceBetween={30}
            modules={[Navigation]}
            onSlideChange={handleSlideChange}
          >
            {learningVideosData.map((item, index) => (
              <SwiperSlide key={index}>
                <VideoSectionComponent
                  image={
                    "https://www.vasterad.com/themes/hireo_21/" + item.image
                  }
                  tag={item.tag}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type='button'
            onClick={wrapClick(handleNext)}
            className={classNames(
              "text-white dark:bg-gray-800 bg-[#333]  hover:dark:bg-gray-900 ",
              "w-11 h-11 px-2.5 rounded",
              isEnd
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-500 cursor-pointer"
            )}
            disabled={isEnd}
          >
            <Icon icon='akar-icons:chevron-right' className='w-5 h-5' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningMaterialsVideoSection;
