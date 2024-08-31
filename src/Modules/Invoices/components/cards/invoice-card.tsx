import { Icon } from "@iconify/react";
import Logo from "Shared/components/brand/logo";
import LogoImage from "Shared/components/brand/logo-image";
import AppConfig from "config";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import { FC, forwardRef } from "react";

interface InvoiceCardProps {
  ref: any;
  data: {
    reference: string;
    code: string;
    date: string | Date;
    method: string;
    from: {
      name: string;
      address: string;
      phoneNumber: string;
    };
    to: {
      name: string;
      address: string;
      phoneNumber: string;
    };
    items: {
      description: string;
      price: number;
      total: number;
    }[];
    total: number;
  };
}

const cardIcon = "ic:outline-credit-card";
const bankIcon = "ic:outline-bank";
const ussdIcon = "ic:outline-ussd";
const qrIcon = "ic:outline-qr-code";
const mobileMoneyIcon = "ic:outline-smartphone";
const bankTransferIcon = "ic:outline-transfer-within-a-station";
const eftIcon = "ic:outline-euro-symbol";

const PaymentIcons = {
  Card: cardIcon,
  Bank: bankIcon,
  Ussd: ussdIcon,
  Qr: qrIcon,
  MobileMoney: mobileMoneyIcon,
  BankTransfer: bankTransferIcon,
  Eft: eftIcon,
};

const InvoiceCard: FC<InvoiceCardProps> = forwardRef<
  HTMLDivElement,
  InvoiceCardProps
>(({ data }, ref) => {
  const getPaymentIcon = (actionType: string) => {
    if (!PaymentIcons.hasOwnProperty(actionType))
      return "ic:outline-attach-money";
    return PaymentIcons[actionType];
  };
  return (
    <div
      ref={ref}
      className='px-[45px] py-[60px] rounded bg-white max-w-[900px] mx-auto'
    >
      {/* LOGO and address invoice header */}
      <div className='flex items-start justify-between mb-[55px]'>
      <LogoImage isCollapsed className="h-[100px]"/>
        <div className=''>
          <div className='text-right'>
            <span className="text-zinc-800 text-base font-semibold font-['Nunito'] leading-7">
              ID:
            </span>
            <span className="text-stone-500 text-base font-light font-['Nunito'] leading-7">
              {" "}
              {data.code}
            </span>
          </div>
          <div className='text-right'>
            <span className="text-zinc-800 text-base font-semibold font-['Nunito'] leading-7">
              Reference:
            </span>
            <span className="text-stone-500 text-base font-light font-['Nunito'] leading-7">
              {" "}
              {data?.reference}
            </span>
          </div>
          <div className='text-right'>
            <span className="text-zinc-800 text-base font-semibold font-['Nunito'] leading-7">
              Issued:
            </span>
            <span className="text-stone-500 text-base font-light font-['Nunito'] leading-7">
              {" "}
              {moment(data.date).format(AppConfig.date.format)}
              <br />
              <p className='flex gap-1.5 items-center justify-end'>
                <Icon
                  icon={getPaymentIcon(_.upperFirst(_.camelCase(data?.method)))}
                  className='w-5 h-5 text-stone-500'
                />
                {data.method}
              </p>
            </span>
          </div>
        </div>
      </div>
      <h1 className=' text-zinc-800 text-4xl font-light  leading-9 mb-[45px]'>
        Invoice
      </h1>
      <div className='grid grid-cols-2 gap-[30px] mb-10'>
        <div>
          <p className='text-zinc-800 text-base font-semibold  leading-7 mb-[5px]'>
            From
          </p>
          <div className=' text-stone-500 text-base font-light  leading-7'>
            {data.from.name}
            <br />
            {data.from.phoneNumber}
            <br />
            {data.from.address}
          </div>
        </div>
        <div>
          <p className='text-zinc-800 text-base font-semibold  leading-7 mb-[5px]'>
            To
          </p>
          <div className=' text-stone-500 text-base font-light  leading-7'>
            {data.to.name}
            <br />
            {data.to.phoneNumber}
            <br />
            {data.to.address}
          </div>
        </div>
      </div>
      <table className='mt-5 w-full mb-[30px]'>
        <tbody className=''>
          <tr className=''>
            <th className='border-b border-neutral-200 py-[15px] text-left font-bold text-[#333]'>
              Description
            </th>
            <th className='border-b border-neutral-200 py-[15px] text-left  font-bold  text-[#333]'>
              Price
            </th>
            {/* <th className='border-b border-neutral-200 py-[15px] text-left  font-bold  text-[#333]'>
              VAT (20%)
            </th> */}
            <th className='border-b border-neutral-200 py-[15px] text-right  font-bold  text-[#333]'>
              Total
            </th>
          </tr>
          {data.items.map((item, index) => (
            <tr className=''>
              <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
                {item.description}
              </td>
              <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
                GHC {numeral(item.price).format("0,0.00")}
              </td>
              {/* <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
            </td> */}
              <td className='text-stone-500 text-base font-light text-right py-[15px] border-b border-neutral-200'>
                GHC {numeral(item.total).format("0,0.00")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='grid-cols-12 grid mb-[60px]'>
        <table id='totals' className='col-span-4'>
          <tbody className=''>
            <tr className=''>
              <th className='border-b border-neutral-200 py-[15px] text-left  font-bold  text-[#333]'>
                Total Due
              </th>
              <th className='border-b border-primary-500 py-[15px] text-right  font-bold  text-[#333] '>
                <span className=''>
                  GHC {numeral(data.total).format("0,0.00")}
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className='flex items-center gap-x-5 py-5 border-t border-t-neutral-200'>
        <p className='text-primary-500 text-[15px] '>www.testuniversal.tech</p>
        <div className='w-px h-[11px] bg-neutral-200'></div>
        <p className=' text-[15px] text-stone-500'>
          finance.testuniversal.tech
        </p>
        <div className='w-px h-[11px] bg-neutral-200 '></div>
        <p className='text-[15px] text-stone-500 '>+233552594990</p>
      </div>
    </div>
  );
});

export default InvoiceCard;
