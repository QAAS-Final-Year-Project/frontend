import { FormikProps, useFormik } from "formik";
import { FC, useEffect } from "react";
import {
  IVerifyUserFormSchema,
  AccountTypeSchema,
  VerificationDocumentsSchema,
} from "./schema";
import moment from "moment";
import lodash from "lodash";
import { classNames, wrapClick } from "Shared/utils/ui";
import SelectInput from "Shared/components/input/select-input";
import TextInput from "Shared/components/input/text-input";
import DocumentUploadBox from "Shared/components/input/document-upload-box";
import SearchSelectInput from "Shared/components/input/search-select-input";
import { VerificationDocumentTypes } from "data";
import { PlusIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import TextButton from "Shared/components/buttons/text-button";

interface VerificationDocumentsFormProps {
  handleNext: (values: IVerifyUserFormSchema["verificationDocuments"]) => void;
  handlePrevious: () => void;
  initialValues: IVerifyUserFormSchema["verificationDocuments"];
  values: IVerifyUserFormSchema;
  handleCancel: () => void;
  parentForm: FormikProps<IVerifyUserFormSchema>;
  step: number;
  lastStep: number;
}

const VerificationDocumentsForm: FC<VerificationDocumentsFormProps> = ({
  initialValues,
  handleNext,
  handleCancel,
  parentForm,
  step,
  lastStep,
  values,
}) => {
  const form = useFormik<IVerifyUserFormSchema["verificationDocuments"]>({
    initialValues,
    validationSchema: VerificationDocumentsSchema(
      values.accountType.accountType
    ),
    onSubmit: (values) => {
      handleNext(values);
    },
    onReset: () => {
      handleCancel?.();
    },
  });

  const removeItem = (field: string, id: number) => {
    form.setFieldValue(field, [
      ..._.get(form.values, field)?.filter(
        (val: string, _id: number) => _id !== id
      ),
    ]);
  };

  const addItem = (field: string) => {
    form.setFieldValue(field, [
      ..._.get(form.values, field),
      { type: "", uploadUrl: "" },
    ]);
  };

  return (
    <form
      onSubmit={form.handleSubmit}
      className='flex-1 flex flex-col overflow-hidden min-h-[60vh]'
    >
      <div className='space-y-6 divide-y divide-gray-200 p-4 md:p-6 flex-1 overflow-y-auto'>
        <div>
          <span className='text-xs font-light'>Verification Documents</span>
          <div className='grid grid-cols-3 gap-6 mt-2'>
            <div className='col-span-3'>
              <div className='flex items-center justify-between'>
                {values.accountType.accountType == "Professional" ? (
                  <div>
                    <span className='text-sm font-medium text-gray-900'>
                      Submit Verification Documents
                    </span>
                    <br />
                    <span className='text-sm text-gray-500'>
                      Please upload the required documents to verify that your
                      are a Professional QA Tester.
                    </span>
                  </div>
                ) : (
                  <div className='rounded-md bg-yellow-50 p-4 w-full'>
                    <div className='flex'>
                      <div className='flex-shrink-0'>
                        <ExclamationTriangleIcon
                          className='h-5 w-5 text-yellow-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='ml-3'>
                        <h3 className='text-sm font-medium text-yellow-800'>
                          Attention
                        </h3>
                        <div className='mt-2 text-sm text-yellow-700'>
                          <p>
                            Since you have selected the Starter account type,
                            you are not required to submit any verification
                            documents.
                            <br />
                            However you would be given a series of tests to
                            complete to verify your skills.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={classNames(
              "mt-6",
              values.accountType.accountType == "Starter" ? "opacity-50" : ""
            )}
          >
            <fieldset
              disabled={values.accountType.accountType == "Starter"}
              className={classNames(
                values.accountType.accountType == "Starter"
                  ? "pointer-events-none"
                  : ""
              )}
            >
              {/* <span className='text-xs font-light'>...</span> */}
              {_.map(form.values.verificationDocuments, (item, idx) => {
                console.log("idx", idx);
                const id = `verificationDocuments[${idx}]`;
                const isLast =
                  (form.values.verificationDocuments?.length - 1 || 0) === idx;
                const handleDocumentTypeChange = (value: string) => {
                  form.setFieldValue(`${id}.type`, value);
                };
                const handleDocumentUploadUrlChange = (value: string) => {
                  form.setFieldValue(`${id}.uploadUrl`, value);
                };
                return (
                  <div className='flex mb-2'>
                    <div
                      className={classNames(
                        "w-20 flex  justify-center",
                        _.get(form.errors, id) && _.get(form.touched, id)
                          ? "items-center"
                          : "items-end"
                      )}
                    >
                      <div
                        className={classNames(
                          "rounded-full px-1 flex  justify-center w-9 h-9 items-center text-center text-gray-500 border-gray-500 text-xs border font-bold "
                        )}
                      >
                        {idx + 1}
                      </div>
                    </div>
                    <div
                      className={classNames(
                        "grid grid-cols-7 gap-6 mt-2 flex-1",
                        form.errors.verificationDocuments?.[idx]
                          ? "items-center"
                          : ""
                      )}
                    >
                      <div className='col-span-3 sm:col-span-2'>
                        <SearchSelectInput
                          id={`${id}.type`}
                          required={true}
                          options={VerificationDocumentTypes.map(
                            (documentType) => ({
                              label: { title: documentType.name },
                              value: documentType?.value,
                            })
                          )}
                          label={" Document Type"}
                          placeholder='Select Document Type'
                          setFieldValue={(_: any, value: string) =>
                            handleDocumentTypeChange(value)
                          }
                          {...form}
                        />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <DocumentUploadBox
                          id={`${id}.uploadUrl`}
                          label='File'
                          required={true}
                          {...form}
                        />
                      </div>
                      <div
                        className={classNames(
                          "col-span-2   h-full flex start",
                          _.get(form.errors, id) && _.get(form.touched, id)
                            ? "items-center"
                            : "items-end"
                        )}
                      >
                        {form.values.verificationDocuments.length > 1 && (
                          <TextButton
                            text='Remove'
                            icon={"uil:times"}
                            onClick={wrapClick(() =>
                              removeItem("verificationDocuments", idx)
                            )}
                            className='text-center text-lg font-extralight text-red-500 hover:bg-red-100 flex-row-reverse'
                          />
                        )}
                        {isLast && (
                          <TextButton
                            text='Add Document'
                            icon={"uil:plus"}
                            onClick={wrapClick(() =>
                              addItem("verificationDocuments")
                            )}
                            className='text-center text-lg font-extralight flex-row-reverse'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </fieldset>
          </div>
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 flex flex-row-reverse border-t border-gray-200'>
        <button
          type='submit'
          // disabled={!form.isValid}
          className={classNames(
            form.isValid ? "hover:bg-primary-700" : "cursor-not-allowed",
            "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ml-3 sm:text-sm disabled:bg-gray-400 sm:w-auto disabled:cursor-not-allowed"
          )}
        >
          Next
        </button>
        <button
          type='button'
          className='w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={wrapClick(form.resetForm)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VerificationDocumentsForm;
