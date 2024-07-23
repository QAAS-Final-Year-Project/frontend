import PrimaryButton from "Shared/components/buttons/primary-button";
import TextInput from "Shared/components/input/text-input";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { useFormik } from "formik";
import { FC } from "react";
import {
  ISecuritySettings,
  SecuritySettingsSchema,
} from "./schema";
import OutlinedButton from "Shared/components/buttons/outline-button";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { showToast } from "Shared/utils/alert";
import { useMutation } from "@tanstack/react-query";
import {
  doUpdateTesterUserPassword,
} from "./duck/fetch";
import _ from "lodash";
// import CheckBox from "Shared/components/input/check-box";

const SecuritySettings: FC<{ user: any }> = ({ user }) => {
  const mutation = useMutation({
    mutationFn: doUpdateTesterUserPassword,
    onSuccess: (data) => {
      showToast({
        type: "success",
        title: "Password Updated",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) =>
      formatAndShowAxiosError(error, "Error updating password"),
  });
  const form = useFormik<ISecuritySettings>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: SecuritySettingsSchema,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    onReset: () => {},
  });
  return (
    <CardSectionWrapper icon={"ic:outline-lock"} title='Password & Security'>
      <form onSubmit={form.handleSubmit}>
        <div className='grid grid-cols-3 mt-[30px] px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
          <div className=''>
            <TextInput
              id='oldPassword'
              label='Current Password'
              type='password'
              required
              placeholder=''
              {...form}
            />
          </div>
          <div className=''>
            <TextInput
              id='newPassword'
              label='New Password'
              type='password'
              required
              placeholder=''
              {...form}
            />
          </div>
          <div className=''>
            <TextInput
              id='repeatNewPassword'
              label='Repeat New Password'
              type='password'
              required
              placeholder=''
              {...form}
            />
          </div>
        </div>
        {/* <div className='px-[30px]'>
          <CheckBox
            id='2fa'
            label='Enable Two-Step Verification via Email'
            checked={false}
            {...form}
          />
        </div> */}
        <div className='bg-gray-50 px-4 py-3 text-right flex justify-end sm:px-6 space-x-3'>
          <OutlinedButton
            type='reset'
            text='Reset'
            onClick={form.handleReset}
            // loading={mutation.isPending}
            // disabled={mutation.isPending}
          />
          <PrimaryButton
            type='submit'
            text='Save'
            loading={mutation.isPending}
            // disabled={mutation.isPending}
          />
        </div>
      </form>
    </CardSectionWrapper>
  );
};

export default SecuritySettings;
