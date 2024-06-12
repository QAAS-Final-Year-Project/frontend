import Logo from "Shared/components/brand/logo";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import { wrapClick } from "Shared/utils/ui";
import { FC, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceCard from "./components/cards/invoice-card";

const InvoicePage: FC = () => {
  const invoiceRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Test Universal Invoice",
    bodyClass: "w-[1000px]",
  });
  return (
    <section className=''>
      <div className='flex items-center justify-center w-full my-10'>
        <SecondaryButton
          onClick={wrapClick(handlePrint)}
          text='Print this Invoice'
          size='md'
          // loading={mutation.isPending}
          type='submit'
        />
      </div>
      <InvoiceCard ref={invoiceRef} data={{}} />
    </section>
  );
};
export default InvoicePage;
