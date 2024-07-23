import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  image: any;
  tag: string;
  date: string;
  title: string;
  description: string;
  href?: string
};

const VideoSectionComponent = (props: Props) => {
  return (
    <Link to={props.href} target="_blank"  className=' yt-content-item group'>
      <img src={props.image} alt='yt-img' />
      <div className='z-[110] px-3 py-[5px] absolute top-[30px] left-[32px] bg-white rounded flex items-center justify-center mb-[180px]'>
        <div className='text-zinc-800 text-sm font-normal  leading-tight'>
          {props.tag}
        </div>
      </div>
      <div className='w-full z-[110] px-[34px] absolute bottom-[32px] left-0'>
        <p className=' text-white text-sm font-normal  leading-[27px] mb-[7px]'>
          {props.date}
        </p>
        <p className=' text-white text-xl font-medium  leading-[30px]'>
          {props.title}
        </p>
        <p className='text-white/80 text-base font-light  leading-[27px]'>
          {props.description}
        </p>
      </div>

      <Icon
        className='absolute top-[calc(27%)] left-[calc(50%-40px)]   text-white w-20 h-20  transition-all duration-[350ms] ease-in-out opacity-0 transform  group-hover:opacity-100 group-hover:translate-y-1/2 z-[110]'
        icon='mdi:youtube'
      />
    </Link>
  );
};

export default VideoSectionComponent;
