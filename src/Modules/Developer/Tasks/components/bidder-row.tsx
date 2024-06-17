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

interface BidderRowProps {
  fullName: string;
  id: any;
  profileImageUrl: string;
  email: string;
  phoneNumber: string;
  rating: number;
  fixedPrice: string;
  country: string;
  showActions: boolean;
  // deliveryTime: string;
  onAccept: () => void;
  onSendMessage: () => void;
  onDelete: () => void;
}

const BidderRow: FC<BidderRowProps> = ({
  fullName,
  profileImageUrl,
  email,
  showActions,
  id,
  phoneNumber,
  rating,
  fixedPrice,
  // deliveryTime,
  country,
  onAccept,
  onSendMessage,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className='py-[22px] px-[30px] flex items-center justify-between border-b border-neutral-200 hover:bg-[#fcfcfc]'>
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
            {showActions && (
              <>
                <PrimaryButton
                  size='sm'
                  icon={"ic:baseline-check"}
                  text='Accept Offer'
                  iconPosition='left'
                  onClick={onAccept}
                />
                <SecondaryButton
                  size='sm'
                  icon={"ic:outline-email"}
                  text='Send Message'
                  iconPosition='left'
                  onClick={onSendMessage}
                />
                <ActionButton action='delete' onClick={onDelete} />
                <ActionButton
                  action='goto'
                  onClick={() => navigate("/testers/" + id)}
                />
              </>
            )}
            {
              !showActions && (
                <SecondaryButton
                size='sm'
                onClick={() => navigate("/testers/" + id)}
                icon={"ic:outline-account-circle"}
                text='View Profile'
                iconPosition='left'
              />
              )
            }
          
          </div>
        </div>
      </div>

      <div className=' py-3.5 px-[25px] bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            {fixedPrice}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Fixed Price
          </span>
        </div>

        {/* <div className='w-0.5 bg-neutral-200 h-10'></div>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold font-['Nunito'] leading-snug">
            {deliveryTime}
          </p>
          <span className="text-center text-zinc-500 text-sm font-normal font-['Nunito'] leading-tight">
            Delivery Time
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default BidderRow;
