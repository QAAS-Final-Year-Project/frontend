import Logo from "Shared/components/brand/logo";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import { wrapClick } from "Shared/utils/ui";
import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceCard from "./components/cards/invoice-card";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPayment } from "Modules/Payment/duck/fetch";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { AxiosError } from "axios";
import _ from "lodash";
import AppConfig from "config";
import Loader from "Shared/components/suspense/loader";

const InvoicePage: FC = () => {
  const { id } = useParams();
  const invoiceRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Test Universal Invoice",
    bodyClass: "w-[1000px]",
  });
  const query = useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPayment(id),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  return (
    <section className=''>
      {query.isLoading ? (
        <div className='min-h-[400px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
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
              reference: query?.data?.data?.reference,
              code: query?.data?.data?.code,
              date: query?.data?.data?.createdAt,
              from: {
                name: AppConfig.invoice.name,
                address: AppConfig.invoice.name,
                phoneNumber: AppConfig.invoice.phoneNumber,
              },
              to: {
                name: query?.data?.data?.createdBy?.fullName,
                address: query?.data?.data?.createdBy?.country,
                phoneNumber: query?.data?.data?.createdBy?.phoneNumber,
              },
              items: [
                {
                  description: query?.data?.data?.reason + " For",
                  price: query?.data?.data?.amount,
                  total: query?.data?.data?.amount,
                },
              ],
              method: query?.data?.data?.paymentMethod,
              total: query?.data?.data?.amount,
            }}
          />
        </>
      )}
    </section>
  );
};
export default InvoicePage;
