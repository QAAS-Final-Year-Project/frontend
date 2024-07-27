import { useQuery } from "@tanstack/react-query";
import React from "react";
import useUrlState from "Shared/hooks/use-url-state";
import { getPaymentByReference, verifyPayment } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import BarLoader from "react-spinners/BarLoader";
import PaymentSuccessSection from "./sections/paymet-sucess";
import PaymentFailedSection from "./sections/payment-failed";
import Logo from "Shared/components/brand/logo";

type Props = {};

const VerifyPaymentScreen = (props: Props) => {
  const [paymentReference] = useUrlState<string>("reference");
  const query = useQuery({
    queryKey: ["verify", paymentReference],
    queryFn: () => verifyPayment(paymentReference),
    // throwOnError: (error: AxiosError | any) => {
    //   formatAndShowAxiosError(error);
    //   return false;
    // },
  });
  const dbPaymentQuery = useQuery({
    queryKey: ["payment", paymentReference],
    queryFn: () => getPaymentByReference(paymentReference),
    enabled: query.isSuccess,
    // throwOnError: (error: AxiosError | any) => {
    //   formatAndShowAxiosError(error);
    //   return false;
    // },
  });

  if (query.isLoading) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <div className='flex-1 flex flex-col space-y-6 items-center justify-center'>
          <Logo isCollapsed />
          <span className='text-gray-600 text-xl font-medium block mb-8'>
            Verifying Payment
          </span>
          <BarLoader
            color={"#2A41E8"}
            loading={true}
            cssOverride={{ width: "30%" }}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      </div>
    );
  } else {
    if (query?.data?.data?.status) {
      return (
        <PaymentSuccessSection
          dbPaymentData={dbPaymentQuery?.data?.data}
          paystackData={query?.data?.data?.data}
          dbPaymentDataLoading={dbPaymentQuery.isLoading}
        />
      );
    } else {
      return <PaymentFailedSection />;
    }
  }
};

export default VerifyPaymentScreen;
