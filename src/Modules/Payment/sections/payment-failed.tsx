import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import InvoiceCard from "Modules/Invoices/components/cards/invoice-card";
import Logo from "Shared/components/brand/logo";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import { wrapClick } from "Shared/utils/ui";
import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PaymentFailedSection: FC = () => {
  return (
    <div className='bg-white h-screen '>
      <div className='bg-white p-6  md:mx-auto'>
        <XCircleIcon className='text-red-600 w-20 h-20 mx-auto my-6' />
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Could not verify payment!
          </h3>
          <p className='text-gray-600 my-2'>
            We could not verify your payment. Please try again.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
          <div className=' text-center'>
            <a href='/'>
              <PrimaryButton text='Go back to home' />
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentFailedSection;
