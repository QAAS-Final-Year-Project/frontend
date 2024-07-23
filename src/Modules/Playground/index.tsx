import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};

const PlaygroundComponent = (props: Props) => {
return (
    <div>
      <Swiper className='w-full '>
        <SwiperSlide className='flex items-center justify-center'>
          1
        </SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'>
          2
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PlaygroundComponent;
