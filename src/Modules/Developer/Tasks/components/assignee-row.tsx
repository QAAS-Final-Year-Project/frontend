import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import StatusChip from "Shared/components/chips/status-chip";
import Avatar from "Shared/components/media/avatar";
import RatingComponent from "Shared/components/status/rating";
import { Nationalities } from "data";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AssignerRowProps {
  fullName: string;
  id: any;
  profileImageUrl: string;
  email: string;
  phoneNumber: string;
  rating: number;
  onSendMessage: () => void;
  country: string;
}

const AssigneeRow: FC<AssignerRowProps> = ({
  fullName,
  profileImageUrl,
  email,
  id,
  phoneNumber,
  rating,
  // deliveryTime,
  onSendMessage,
  country,
}) => {
  const navigate = useNavigate();
  return (
    <div className='py-[22px] px-[30px] flex items-center justify-between border rounded border-neutral-200 bg-[#fcfcfc]'>
      <div className='flex items-center gap-x-[30px]'>
        <Avatar alt={fullName} size='xl' src={profileImageUrl} />
        <div className=''>
          <div className='flex gap-x-1 mb-0.5 items-center'>
            <p className=" text-center  text-zinc-800 text-lg font-semibold font-['Nunito'] leading-[27px]">
              {fullName}{" "}
              {
                Nationalities.find((nat) => nat.en_short_name === country)
                  ?.emoji
              }
            </p>
          </div>

          <div className='flex gap-x-2 mb-3'>
            <p className=" text-neutral-500 flex  items-center gap-0.5 text-base font-normal font-['Nunito'] leading-relaxed">
              <Icon
                icon={"ic:outline-email"}
                className='w-5 h-5 text-neutral-500'
              />{" "}
              {email}
            </p>
            <p className=" text-neutral-500 flex ga-0.5 items-center text-base font-normal font-['Nunito'] leading-relaxed">
              <Icon
                icon={"ic:outline-phone"}
                className='w-5 h-5 text-neutral-500'
              />{" "}
              {phoneNumber}
            </p>
          </div>
          <div className='mb-5'>
            <RatingComponent rating={rating} />
          </div>
          <div className='flex gap-x-2.5 items-stretch'>
            <PrimaryButton
              size='sm'
              onClick={() => navigate("/testers/" + id)}
              icon={"ic:outline-account-circle"}
              text='View Profile'
              iconPosition='left'
            />
            <SecondaryButton
              size='sm'
              icon={"ic:outline-email"}
              text='Send Message'
              iconPosition='left'
              onClick={onSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssigneeRow;
