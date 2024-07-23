import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { string } from "yup";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
import moment from "moment";
import AppConfig from "config";

interface PaymentRowProps {
  plan: string;
  status: string;
  reference: string;
  date: string | Date;
}

const PaymentRow: FC<PaymentRowProps> = ({ plan, status, reference, date }) => {
  return (
    <div className='relative group'>
      <div className='py-[22px] px-[30px] border-b border-neutral-200 hover:bg-[#fcfcfc] cursor-pointer'>
        <div className='text-zinc-800 text-base font-semibold leading-relaxed mb-1'>
          {plan}
        </div>
        <div className='flex items-center gap-x-2.5'>
          <div
            className={classNames(
              "px-2 py-[3px] rounded justify-start items-start inline-flex",
              status == "Paid" ? "bg-green-600" : "bg-red-600"
            )}
          >
            <span className='text-white text-[13px] font-normal leading-tight'>
              {status}
            </span>
          </div>
          <div className='w-px h-[11px] bg-neutral-200'></div>
          <p className="text-neutral-400 text-sm font-normal  leading-snug">
            Order: #{reference}
          </p>
          <div className="text-neutral-400 text-sm font-normal  leading-snug">
            Date: {moment(date).format(AppConfig.date.format)}
          </div>
        </div>
      </div>
      <div className='absolute invoice-btn py-1.5 px-[15px] right-[30px] rounded text-[#666] text-[13px] cursor-pointer bg-[#EEE] transition-all duration-300 ease-in-out opacity-0 transform -translate-y-full group-hover:opacity-100 group-hover:translate-y-1/2 mt-3 top-0 hover:text-white hover:bg-[#333]'>
        View Invoice
      </div>
    </div>
  );
};

export default PaymentRow;
