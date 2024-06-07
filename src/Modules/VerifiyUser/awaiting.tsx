import { UserPlusIcon } from "@heroicons/react/20/solid";
import { BoxWaitingLottie } from "assets";
import { FC } from "react";
import Lottie from "react-lottie";

const AwaitingVerificationPage: FC = () => {
  return (
    <div className='flex mt-2 w-full bg-white items-center justify-center'>
      <div className='relative  block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 py-24 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: BoxWaitingLottie,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={100}
          width={100}
        />

        <h3 className='mt-2 text-sm font-medium text-gray-900'>
          Verification Pending
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          You will be notified once your account has been verified
        </p>
      </div>
    </div>
  );
};

export default AwaitingVerificationPage;
