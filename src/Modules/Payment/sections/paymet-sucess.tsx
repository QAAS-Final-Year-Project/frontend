import InvoiceCard from "Modules/Invoices/components/cards/invoice-card";
import Logo from "Shared/components/brand/logo";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import Loader from "Shared/components/suspense/loader";
import { wrapClick } from "Shared/utils/ui";
import AppConfig from "config";
import _ from "lodash";
import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PaymentSuccessSection: FC<{
  dbPaymentData: any;
  dbPaymentDataLoading: boolean;
  paystackData: any;
}> = ({ dbPaymentData, paystackData, dbPaymentDataLoading }) => {
  const invoiceRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Test Universal Invoice",
    bodyClass: "w-[1000px]",
  });
  return (
    <div className='bg-gray-100 h-screen'>
      <div className='bg-white p-6  md:mx-auto'>
        <svg
          viewBox='0 0 24 24'
          className='text-green-600 w-16 h-16 mx-auto my-6'
        >
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Payment Done!
          </h3>
          <p className='text-gray-600 my-2'>
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className='mt-10 mb-10 flex items-center justify-center gap-x-6'>
            <a href='/'>
              <PrimaryButton text='Go back to home' />
            </a>
            <a
              href='mailto:support@testuniversal.tech'
              className='text-sm font-semibold text-gray-900'
            >
              Contact support <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      {dbPaymentDataLoading && (
        <div className='min-h-[200px] flex items-center justify-center'>
          <Loader text='Loading invoice....' />
        </div>
      )}
      {dbPaymentData && (
        <section className='bg-gray-100'>
          <div className='flex items-center justify-center w-full my-10'>
            <SecondaryButton
              onClick={wrapClick(handlePrint)}
              text='Print this Invoice'
              size='md'
              // loading={mutation.isPending}
              type='submit'
            />
          </div>
          <InvoiceCard
            ref={invoiceRef}
            data={{
              reference: dbPaymentData?.reference,
              code: dbPaymentData?.code,
              date: dbPaymentData?.createdAt,
              from: {
                name: AppConfig.invoice.name,
                address: AppConfig.invoice.name,
                phoneNumber: AppConfig.invoice.phoneNumber,
              },
              to: {
                name: dbPaymentData?.createdBy?.fullName,
                address: dbPaymentData?.createdBy?.country,
                phoneNumber: dbPaymentData?.createdBy?.phoneNumber,
              },
              items: [
                {
                  description: dbPaymentData?.reason + " For",
                  price: dbPaymentData?.amount,
                  total: dbPaymentData?.amount,
                },
              ],
              method: _.upperFirst(_.camelCase(paystackData?.channel || "")),
              total: dbPaymentData?.amount,
            }}
          />
        </section>
      )}
    </div>
  );
};
export default PaymentSuccessSection;
