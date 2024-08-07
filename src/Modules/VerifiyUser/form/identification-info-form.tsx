import { FormikProps, useFormik } from "formik";
import { FC, useEffect } from "react";
import { IVerifyUserFormSchema, IdentificationInfoSchema } from "./schema";
import moment from "moment";
import lodash from "lodash";
import { classNames, wrapClick } from "Shared/utils/ui";
import SelectInput from "Shared/components/input/select-input";
import TextInput from "Shared/components/input/text-input";
import UploadArea from "Shared/components/input/upload-area";
import { Nationalities } from "data";
import AppConfig from "config";
import SearchSelectInput from "Shared/components/input/search-select-input";
import AvatarUpload from "Shared/components/input/avatar-upload";
import PrimaryButton from "Shared/components/buttons/primary-button";
import OutlinedButton from "Shared/components/buttons/outline-button";

interface IdentificationInfoProps {
  handleNext: (values: IVerifyUserFormSchema["identificationInfo"]) => void;
  handlePrevious: () => void;
  initialValues: IVerifyUserFormSchema["identificationInfo"];
  values: IVerifyUserFormSchema;
  handleCancel: () => void;
  parentForm: FormikProps<IVerifyUserFormSchema>;
  step: number;
  lastStep: number;
}

const IdentificationInfoForm: FC<IdentificationInfoProps> = ({
  initialValues,
  handleNext,
  handleCancel,
  handlePrevious,
  values,
  parentForm,
  step,
  lastStep,
}) => {
  const form = useFormik<IVerifyUserFormSchema["identificationInfo"]>({
    initialValues,
    validationSchema: IdentificationInfoSchema,
    onSubmit: (values) => {
      handleNext(values);
    },
    onReset: () => {
      handleCancel?.();
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      className='flex-1 flex flex-col overflow-hidden'
    >
      <div className='space-y-6 divide-y divide-gray-200 p-6 flex-1 overflow-y-auto'>
        <div
          className={
            classNames()
            // values.customerInfo.customerType === "Organization" ? "pt-6" : ""
          }
        >
          <span className='text-zinc-800 text-sm font-semibold leading-[27px]'>
            Identity Type Information
          </span>
          <div className='grid grid-cols-3 gap-6 mt-2'>
            <div>
              <SelectInput
                id='identityCardType'
                label='ID Type'
                options={[
                  { label: "--- Select ID Type ---", value: "" },
                  { label: "National ID", value: "NationalIdentificationCard" },
                  { label: "Driver's License", value: "DriversLicense" },
                  { label: "Passport", value: "Passport" },
                  {
                    label: "Student ID",
                    value: "StudentIdentificationCard",
                  },
                  {
                    label: "Voters ID",
                    value: "VotersIdentificationCard",
                  },
                ]}
                required={true}
                {...form}
              />
            </div>
          </div>
        </div>

        <div className='pt-6'>
          <span className='text-zinc-800 text-sm font-semibold leading-[27px]'>
            Identity Information
          </span>{" "}
          <div className='grid grid-cols-6 gap-6 mt-2'>
            <div className='col-start-1'>
              <div className='max-w-fit'>
                <AvatarUpload
                  isProfile={true}
                  required
                  id='profileImageUrl'
                  label='Photo'
                  {...form}
                />
              </div>
            </div>
            <div className='col-span-2 col-start-1'>
              <TextInput
                id='dateOfBirth'
                label={`Date of Birth`}
                type='date'
                required={true}
                max={moment()
                  .subtract(18, "years")
                  .format(AppConfig.date.inputDateFormat)}
                {...form}
              />
            </div>
            <div className='col-span-2 '>
              <div>
                <div>
                  <SearchSelectInput
                    id='nationality'
                    label={` Nationality`}
                    placeholder='Select National'
                    options={[
                      ...lodash
                        .map(Nationalities, "nationality")
                        .map((nationality) => ({
                          label: {
                            title: nationality,
                          },
                          value: nationality,
                        })),
                    ]}
                    required={true}
                    {...form}
                  />
                </div>
              </div>
            </div>

            <div className='col-span-2 col-start-1'>
              <TextInput
                id='identityCardNumber'
                label={"ID Number"}
                type='text'
                placeholder='eg. GH034034034'
                required={true}
                {...form}
              />
            </div>

            <div className='col-span-2'>
              <TextInput
                id='identityCardIssueDate'
                label='ID Issue Date'
                type='date'
                required={true}
                {...form}
              />
            </div>
            {form.values.identityCardType !== "VotersIdentificationCard" && (
              <div className='col-span-2'>
                <TextInput
                  id='identityCardExpiryDate'
                  label='ID Expiry Date'
                  type='date'
                  required={true}
                  {...form}
                />
              </div>
            )}

            <div className='col-span-3 col-start-1'>
              <UploadArea
                id='identityCardFrontImageUrl'
                label='ID Front Image'
                required={true}
                {...form}
              />
            </div>

            {!["DriversLicense", "VotersIdentificationCard"].includes(
              form.values.identityCardType
            ) && (
              <div className='col-span-3'>
                <UploadArea
                  id='identityCardBackImageUrl'
                  label='ID Back Image'
                  required={true}
                  {...form}
                />
              </div>
            )}
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

export default IdentificationInfoForm;
