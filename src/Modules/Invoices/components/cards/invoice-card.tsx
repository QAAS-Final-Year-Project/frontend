import Logo from "Shared/components/brand/logo";
import { FC, forwardRef } from "react";

interface InvoiceCardProps {
  ref: any;
  data:any
}

const InvoiceCard: FC<InvoiceCardProps> = forwardRef<
  HTMLDivElement,
  InvoiceCardProps
>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className='px-[45px] py-[60px] rounded bg-white max-w-[900px] mx-auto'
    >
      {/* LOGO and address invoice header */}
      <div className='flex items-start justify-between mb-[55px]'>
        <Logo  />
        <div className=''>
          <div className='text-right'>
            <span className="text-zinc-800 text-base font-semibold  leading-7">
              Order:
            </span>
            <span className="text-stone-500 text-base font-light  leading-7">
              {" "}
              #00124
            </span>
          </div>
          <div className='text-right'>
            <span className="text-zinc-800 text-base font-semibold  leading-7">
              Issued:
            </span>
            <span className="text-stone-500 text-base font-light  leading-7">
              {" "}
              20/08/2019
              <br />
              Due 7 days from date of issue
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
            Supplier
          </p>
          <div className=' text-stone-500 text-base font-light  leading-7'>
            Hireo Ltd.
            <br />
            21 St Andrews Lane
            <br />
            London, CF44 6ZL, UK
          </div>
        </div>
        <div>
          <p className='text-zinc-800 text-base font-semibold  leading-7 mb-[5px]'>
            John Doe
          </p>
          <div className=' text-stone-500 text-base font-light  leading-7'>
            36 Edgewater Street
            <br />
            21 St Andrews Lane
            <br />
            Melbourne, 2540, Australia
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
            <th className='border-b border-neutral-200 py-[15px] text-left  font-bold  text-[#333]'>
              VAT (20%)
            </th>
            <th className='border-b border-neutral-200 py-[15px] text-right  font-bold  text-[#333]'>
              Total
            </th>
          </tr>

          <tr className=''>
            <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
              Standard Plan
            </td>
            <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
              $49.00
            </td>
            <td className='text-stone-500 text-base font-light text-left py-[15px] border-b border-neutral-200'>
              $9.80
            </td>
            <td className='text-stone-500 text-base font-light text-right py-[15px] border-b border-neutral-200'>
              $58.80
            </td>
          </tr>
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
                <span className=''>$58.80</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div className='flex items-center gap-x-5 py-5 border-t border-t-neutral-200'>
        <p className='text-primary-500 text-[15px] '>www.testuniversal.com</p>
        <div className='w-px h-[11px] bg-neutral-200'></div>
        <p className=' text-[15px] text-stone-500'>office@example.com</p>
        <div className='w-px h-[11px] bg-neutral-200 '></div>
        <p className='text-[15px] text-stone-500 '>0552594990</p>
      </div>
    </div>
  );
});

export default InvoiceCard;
