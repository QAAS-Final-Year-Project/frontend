import { FormikProps, useFormik } from "formik";
import { FC,  } from "react";
import {
  IVerifyUserFormSchema,
  VerificationDocumentsSchema,
} from "./schema";
import moment from "moment";
import lodash from "lodash";
import { classNames, wrapClick } from "Shared/utils/ui";
import DocumentUploadBox from "Shared/components/input/document-upload-box";
import SearchSelectInput from "Shared/components/input/search-select-input";
import { VerificationDocumentTypes } from "data";
import _ from "lodash";
import {
  ExclamationTriangleIcon,

} from "@heroicons/react/20/solid";
import TextButton from "Shared/components/buttons/text-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import OutlinedButton from "Shared/components/buttons/outline-button";

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
  handlePrevious
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
          <span className='text-zinc-800 text-sm font-semibold leading-[27px]'>
            Verification Documents
          </span>
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
                        <h3 className='font-medium text-yellow-800'>
                          Attention
                        </h3>
                        <div className='mt-2  text-yellow-700'>
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
                            size="md"
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

      <div className='bg-gray-50 gap-x-3 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200'>
        <PrimaryButton
          type='button'
          size='sm'
          onClick={wrapClick(form.handleSubmit)}
          text='Next'
        />
          <OutlinedButton
            type='button'
            size='sm'
            text='Previous'
          onClick={wrapClick(handlePrevious)}
          
        />
          
        <OutlinedButton
          type='button'
          size='sm'
          text='Cancel'
          onClick={wrapClick(form.resetForm)}
       />
      </div>
    </form>
  );
};

export default VerificationDocumentsForm;
