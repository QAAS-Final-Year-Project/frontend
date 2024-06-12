import { Icon } from "@iconify/react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import Avatar from "Shared/components/media/avatar";
import RatingComponent from "Shared/components/status/rating";
import { Nationalities } from "data";
import { FC } from "react";
interface TesterGridCardProps {
  fullName: string;
  profileImageUrl?: string;
  role: string;
  country: string;
  rating: number;
rate: number;
  jobSuccess: number;
  location: string;
}

const TesterGridCard: FC<TesterGridCardProps> = ({
  fullName,
  country,
  rating,
  rate,
  jobSuccess,
  location,

  profileImageUrl,
  role,
}) => {
  return (
    <div className=' bg-white rounded shadow flex-col justify-center items-start inline-flex'>
      <div className='py-10 w-full px-5 relative flex  flex-col items-center'>
        <div className='mb-4'>
          <Avatar alt={fullName} size='xl' src={profileImageUrl} />
        </div>
        <p className=" text-center text-zinc-800 text-lg font-semibold font-['Nunito'] leading-[27px]">
          {fullName}{" "}
          {Nationalities.find((nat) => nat.en_short_name === country)?.emoji}
        </p>
        <p className="text-center text-zinc-500 text-base font-normal font-['Nunito'] leading-[27px] mb-1.5">
          {role}
        </p>
        <RatingComponent rating={rating} />
      </div>
      <div className=' p-[35px] bg-neutral-50 rounded-bl rounded-br w-full space-y-4'>
        <div className='flex gap-x-7 items-center'>
          <div>
            <div className=" text-zinc-500 text-sm font-normal font-['Nunito'] leading-[23px]">
              {location}
            </div>
            <div className="text-zinc-800 text-sm font-bold font-['Nunito'] leading-[23px] flex items-center">
              {" "}
              <Icon
                icon={"ic:outline-location-on"}
                className='w-[15px] h-[15px]'
              />
              {location}
            </div>
          </div>
          <div>
            <div className=" text-zinc-500 text-sm font-normal font-['Nunito'] leading-[23px]">
              Rate
            </div>
            <div className="text-zinc-800 text-sm font-bold font-['Nunito'] leading-[23px] flex items-center">
              {" "}
              ${rate} / hr
            </div>
          </div>
          <div>
            <div className=" text-zinc-500 text-sm font-normal font-['Nunito'] leading-[23px]">
              Job Success
            </div>
            <div className="text-zinc-800 text-sm font-bold font-['Nunito'] leading-[23px] flex items-center">
              {" "}
              {jobSuccess}%
            </div>
          </div>
        </div>
        <PrimaryButton className='w-full' text='View Profile' size='sm' />
      </div>
    </div>
  );
};

export default TesterGridCard;
