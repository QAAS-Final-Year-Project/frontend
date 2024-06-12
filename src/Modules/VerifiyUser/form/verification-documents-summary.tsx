import { FC } from "react";
import { IVerifyUserFormSchema } from "./schema";
import moment from "moment";
import lodash from "lodash";
import AppConfig from "config";
import _ from "lodash";
import { VerificationDocumentTypes } from "data";

const VerificationDocumentsSummary: FC<{
  data: IVerifyUserFormSchema["verificationDocuments"];
}> = ({ data }) =>
  data.verificationDocuments[0].type ? (
    <div className=''>
      <div className='grid grid-cols-3 gap-6 mt-2'>
        <div className='col-span-3'>
          <div className='mt-1 w-full '>
            <table className='min-w-full divide-y divide-gray-300 border border-gray-300 rounded-md'>
              <thead className='bg-gray-50'>
                <tr className='divide-x divide-gray-200'>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900 '
                  ></th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900 '
                  >
                    Selected Type
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900 '
                  >
                    Description
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-2 text-sm font-semibold text-gray-900  text-left'
                  >
                    Uploaded Document
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {_.map(
                  data?.verificationDocuments,
                  (verificationDocument, idx) => {
                    const id = `materials[${idx}]`;
                    const isLast =
                      (data?.verificationDocuments?.length || 0) === idx;
                    return (
                      <tr key={idx} className='divide-x divide-gray-200'>
                        <td className='py-2 whitespace-nowrap text-sm text-gray-800 font-medium dark:text-gray-400  px-3'>
                          {idx + 1 || "N/A"}
                        </td>
                        <td className='py-4 whitespace-nowrap text-sm text-gray-800 font-medium dark:text-gray-400  px-3'>
                          {VerificationDocumentTypes.find(
                            (item) => item.value == verificationDocument.type
                          ).name || "N/A"}
                        </td>
                        <td className='py-2 whitespace-nowrap text-xs text-gray-800 font-medium dark:text-gray-400  px-3'>
                          {VerificationDocumentTypes.find(
                            (item) => item.value == verificationDocument.type
                          ).description || "N/A"}
                        </td>
                        <td className='px-3 text-left'>
                          <p className=' text-sm '>
                            <a
                              href={verificationDocument.uploadUrl}
                              target='_blank'
                              // download
                              rel='noreferrer'
                              className='whitespace-nowrap  text-primary-500 hover:text-primary-600'
                            >
                              Click Here to View
                              <span aria-hidden='true'> &rarr;</span>
                            </a>
                          </p>{" "}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-[300px] items-center justify-center flex'>
      <div className='text-center'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400 dark:text-gray-300'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            vectorEffect='non-scaling-stroke'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
          />
        </svg>
        <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-gray-100'>
          No Verification Documents
        </h3>
      </div>
    </div>
  );

export default VerificationDocumentsSummary;
