import { Icon } from "@iconify/react";
import PrimaryChip from "Shared/components/chips/primary-chip";
import Avatar from "Shared/components/media/avatar";
import { FC } from "react";

interface TestimonialCardProps {
  profileImageUrl: string;
  name: string;
  designation: string;
  message: string;
}
const TestimonialCard: FC<TestimonialCardProps> = ({
  profileImageUrl,
  name,
  designation,
  message,
}) => {
  return (
    <div className='w-[800px] mx-auto'>
      <Icon
        icon={"ic:outline-format-quote"}
        className='text-primary-500 w-20 h-20'
      />
      <div className='mt-[35px] w-full  px-[45px]  pt-[35px] pb-[45px] bg-white rounded-md shadow '>
        <div className='flex w-full items-center flex-col -mt-[80px]'>
          <Avatar size='lg' src={profileImageUrl} alt={name} />
          <p className=' text-center text-zinc-800 text-lg font-semibold  leading-[27px] mt-5 mb-2'>
            {name}
          </p>
          <PrimaryChip text={designation} hasShadow={true} />

          <p className=' text-center text-zinc-500 text-lg font-light  leading-loose mt-[25px]'>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
