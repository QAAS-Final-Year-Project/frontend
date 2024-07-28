import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { ChartData, ChartOptions } from "chart.js/auto";
import LineChart from "Shared/components/chart/my-line-chart";
import { string } from "yup";
import { Icon } from "@iconify/react";
import { classNames, wrapClick } from "Shared/utils/ui";
import moment from "moment";
import AppConfig from "config";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

interface PaymentRowProps {
  amount: string;
  reason: string;
  reference: string;
  date: string | Date;
  id: string;
  status: string;
}

const mobileMoneyIcon = "ic:outline-smartphone";
const cashIcon = "ic:outline-attach-money";

const PaymentIcons = {
  MobileMoney: mobileMoneyIcon,
  Cash: cashIcon,
};

const PaymentRow: FC<PaymentRowProps> = ({
  amount,
  reason,
  reference,
  status,
  date,
  id,
}) => {
  const navigate = useNavigate();

  const formattedAmount = numeral(amount).format("0,0.00"); // Format the amount to always have two decimal places

  return (
    <div
      className='relative group'
      onClick={
        status == "Completed" ? () => navigate("/payments/" + id) : () => {}
      }
    >
      <div className='py-[22px] px-[30px] border-b border-neutral-200 hover:bg-[#fcfcfc] '>
        <div className='text-zinc-800 text-base font-semibold leading-relaxed mb-1'>
        GHS   {formattedAmount} 
        </div>
        <div className='flex items-center gap-x-2.5'>
          
          <div
            className={classNames(
              "px-2 py-[3px] rounded justify-start items-start inline-flex",
              status == "Completed" ? "bg-green-600" : "",
              status == "Failed" ? "bg-red-600" : "",
              status == "Pending" ? "bg-yellow-600" : ""
            )}
          >

            <span className='text-white text-[13px] font-normal leading-tight'>
              {status}
            </span>
          </div>
          <div className='w-px h-[11px] bg-neutral-200'></div>

          <p className='flex gap-1.5 items-center text-stone-500  text-sm font-medium  leading-relaxed'>
            {reason}
          </p>
          <div className='w-px h-[11px] bg-neutral-200'></div>
          <p className="text-neutral-400 text-sm font-normal font-['Nunito'] leading-snug">
            Ref: #{reference}
          </p>
          <div className='w-px h-[11px] bg-neutral-200'></div>
          <div className="text-neutral-400 text-sm font-normal font-['Nunito'] leading-snug">
            Date: {moment(date).format(AppConfig.date.format)}
          </div>
        </div>
      </div>
      {status == "Completed" && (
        <div className='absolute invoice-btn py-1.5 px-[15px] right-[30px] rounded text-[#666] text-[13px] cursor-pointer bg-[#EEE] transition-all duration-300 ease-in-out opacity-0 transform -translate-y-full group-hover:opacity-100 group-hover:translate-y-1/2 mt-3 top-0 hover:text-white hover:bg-[#333]'>
          View Invoice
        </div>
      )}
    </div>
  );
};

export default PaymentRow;
