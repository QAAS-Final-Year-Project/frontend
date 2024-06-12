import Container from "Shared/components/layout/container";
import React, { FC, useEffect, useRef } from "react";
import SectionTitle from "../components/section-title";
import TestimonialCard from "../components/testimonial-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import {
  EffectCreative,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useSwiper } from "swiper/react";
import { Icon } from "@iconify/react";
import { classNames, wrapClick } from "Shared/utils/ui";

export const TestimonialsSection: FC = () => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <section className='bg-stone-50'>
      <Container className=' pt-[65px] pb-[75px]'>
        <SectionTitle text={"Testimonials"} />
        <div className='mt-5 relative'>
          <Swiper
            loop={true}
            ref={swiperRef}
            spaceBetween={30}
            effect={"creative"}
            speed={600}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
                shadow: true,
              },
            }}
            modules={[EffectCreative, Navigation]} // loop={true}
            // speed={1000}
            autoplay={{
              pauseOnMouseEnter: false,
              delay: 2500,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            navigation={false}
            className='swiper-button-white'
          >
            <SwiperSlide className='bg-stone-50'>
              <TestimonialCard
                name='Marcin Kowalski'
                designation='Tester'
                profileImageUrl='https://www.vasterad.com/themes/hireo_21/images/user-avatar-small-02.jpg'
                message='Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions. '
              />
            </SwiperSlide>
            <SwiperSlide className='bg-stone-50'>
              <TestimonialCard
                name='Marcin Kowalski'
                designation='Tester'
                profileImageUrl='https://www.vasterad.com/themes/hireo_21/images/user-avatar-small-02.jpg'
                message='Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions. '
              />
            </SwiperSlide>
            <SwiperSlide className='bg-stone-50'>
              <TestimonialCard
                name='Marcin Kowalski'
                designation='Tester'
                profileImageUrl='https://www.vasterad.com/themes/hireo_21/images/user-avatar-small-02.jpg'
                message='Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions. '
              />
            </SwiperSlide>
          </Swiper>
          <button
            type='button'
            onClick={wrapClick(handlePrev)}
            className={classNames(
              "  text-white  dark:bg-gray-800 bg-[#333] hover:bg-primary-500 hover:dark:bg-gray-900 cursor-pointer",
              "w-11 h-11 px-2.5 rounded ",
              "absolute top-1/2 left-0 transform -translate-y-1/2 z-[100]"
            )}
          >
            <Icon icon='akar-icons:chevron-left' className='w-5 h-5 ' />
          </button>

          <button
            type='button'
            onClick={wrapClick(handleNext)}
            className={classNames(
              " text-white  dark:bg-gray-800 bg-[#333] hover:bg-primary-500 hover:dark:bg-gray-900 cursor-pointer",
              "w-11 h-11 px-2.5 rounded  ",
              "absolute top-1/2 right-0 transform -translate-y-1/2  z-[100]"
            )}
          >
            <Icon icon='akar-icons:chevron-right' className='w-5 h-5 ' />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
