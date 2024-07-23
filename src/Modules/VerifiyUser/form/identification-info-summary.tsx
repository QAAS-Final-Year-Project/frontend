import { FC } from "react";
import { IVerifyUserFormSchema } from "./schema";
import moment from "moment";
import lodash from "lodash";
import AppConfig from "config";
import { wrapImage } from "Shared/utils/ui";
import _ from "lodash";
import useCookies from "Shared/hooks/cookies";
import Avatar from "Shared/components/media/avatar";

const IdentificationInfoSummary: FC<{
  data: IVerifyUserFormSchema["identificationInfo"];
}> = ({ data }) => {
  const [user] = useCookies("user");
  const parsedUser = JSON.parse(user);
  return (
    <div className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-3 space-y-6 divide-y divide-gray-200'>
      <>
        <div className=''>
          <span className='text-zinc-800 text-sm font-semibold'>
            Identity Type Information
          </span>
          <div className='grid grid-cols-6 gap-6 mt-2'>
            <div className='col-span-2'>
              <span className='block text-base font-light text-gray-700'>
                ID Type
              </span>
              <div className='mt-1 block w-full sm:text-base'>
                {_.startCase(data?.identityCardType) || "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className='pt-6'>
          <span className='text-zinc-800 text-sm font-semibold'>Identity Information</span>

          <div className='grid grid-cols-6 gap-6 mt-2'>
            <div className='col-span-1'>
              <span className='block text-base font-light text-gray-700'>
                Photo
              </span>
              <Avatar
                alt={parsedUser?.fullName || "N A"}
                src={data?.profileImageUrl || ""}
                size='lg'
              />
            </div>
            <div className='col-start-1 col-span-2'>
              <span className='block text-base font-light text-gray-700'>
                Nationality
              </span>
              <div className='mt-1 block w-full sm:text-base'>
                {data?.nationality || "N/A"}
              </div>
            </div>
            <div className='col-span-2'>
              <span className='block text-base font-light text-gray-700'>
                Date of Birth
              </span>
              <div className='mt-1 block w-full sm:text-base'>
                {moment(data?.dateOfBirth).format(AppConfig.date.format)}
              </div>
            </div>
            <div className='col-span-2 col-start-1'>
              <span className='block text-base font-light text-gray-700'>
                ID Number
              </span>
              <div className='mt-1 block w-full sm:text-base'>
                {data?.identityCardNumber || "N/A"}
              </div>
            </div>
            <div className='col-span-2'>
              <span className='block text-base font-light text-gray-700'>
                ID Issue Date
              </span>
              <div className='mt-1 block w-full sm:text-base'>
                {moment(data?.identityCardIssueDate).format(
                  AppConfig.date.format
                )}
              </div>
            </div>
            {data.identityCardType !== "VotersIdentificationCard" && (
              <div className='col-span-2'>
                <span className='block text-base font-light text-gray-700'>
                  ID Expiry Date
                </span>
                <div className='mt-1 block w-full sm:text-base'>
                  {moment(data?.identityCardExpiryDate).format(
                    AppConfig.date.format
                  )}
                </div>
              </div>
            )}

            <div className='col-span-3'>
              <span className='block text-base font-light text-gray-700'>
                ID Front Image
              </span>
              <div className='mt-2'>
                {wrapImage(
                  <img
                    src={data?.identityCardFrontImageUrl}
                    alt={"front"}
                    className='w-full h-64 text-xs'
                  />
                )}
              </div>
            </div>
            {!["DriversLicense", "VotersIdentificationCard"].includes(
              data.identityCardType
            ) && (
              <div className='col-span-3'>
                <span className='block text-base font-light text-gray-700'>
                  ID Back Image
                </span>
                <div className='mt-2'>
                  {wrapImage(
                    <img
                      src={data?.identityCardBackImageUrl}
                      alt={"back"}
                      className='w-full h-64 text-xs'
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default IdentificationInfoSummary;
