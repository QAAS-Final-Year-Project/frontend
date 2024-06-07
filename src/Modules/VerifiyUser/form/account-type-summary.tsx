import { FC } from "react";
import { IVerifyUserFormSchema } from "./schema";
import moment from "moment";
import lodash from "lodash";
import AppConfig from "config";

const AccountTypeSummary: FC<{
  data: IVerifyUserFormSchema["accountType"];
}> = ({ data }) => (
  <div className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-3 space-y-6 divide-y divide-gray-200'>
    <div className=''>
      {/* <span className='text-xs font-light'>Account Type</span> */}
      <div className='grid grid-cols-3 gap-6 mt-2'>
        <div className='col-span-1'>
          <span className='block text-sm font-light text-gray-700'>
           Selected Account Type
          </span>
          <div className='mt-1 block w-full sm:text-sm'>
            {data?.accountType || "N/A"}
          </div>
        </div>
     
      </div>
    </div>
  </div>
);

export default AccountTypeSummary;
