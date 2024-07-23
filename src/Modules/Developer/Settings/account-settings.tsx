import PrimaryButton from "Shared/components/buttons/primary-button";
import TextInput from "Shared/components/input/text-input";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { useFormik } from "formik";
import { FC } from "react";
import { AccountSettingsSchema, IAccountSettings } from "./schema";
import AvatarUpload from "Shared/components/input/avatar-upload";
import OutlinedButton from "Shared/components/buttons/outline-button";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { showToast } from "Shared/utils/alert";
import { useMutation } from "@tanstack/react-query";
import { doUpdateDeveloperUserProfile } from "./duck/fetch";
import _ from "lodash";
import RatingComponent from "Shared/components/status/rating";

const AccountSettings: FC<{ user: any }> = ({ user }) => {
  const mutation = useMutation({
    mutationFn: doUpdateDeveloperUserProfile,
    onSuccess: (data) => {
      showToast({
        type: "success",
        title: "Profile Updated",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) =>
      formatAndShowAxiosError(error, "Error updating profile"),
  });
  const form = useFormik<IAccountSettings>({
    initialValues: {
      profileImageUrl: user?.profileImageUrl,
      fullName: user?.fullName,
      emailAddress: user?.emailAddress,
      phoneNumber: user?.phoneNumber,
      country: user?.country,
      organizationName: user?.organizationName,
      rating: user?.rating,
    },
    validationSchema: AccountSettingsSchema,
    onSubmit: async (values) => {
      mutation.mutate(
        _.pick(values, [
          "fullName",
          "profileImageUrl",
          "phoneNumber",
          "organizationName",
        ])
      );
    },
    onReset: () => {},
  });
  return (
    <CardSectionWrapper icon={"ic:outline-account-circle"} title='My Account'>
      <form onSubmit={form.handleSubmit}>
        <div className='mt-[30px] mb-9 flex gap-x-6 mr-[30px]'>
          <div className='pl-4'>
            <AvatarUpload id='profileImageUrl' isProfile={true} {...form} />
            <div className='flex justify-center w-full mt-4'>
              <RatingComponent rating={form.values.rating || 0} />
            </div>
          </div>
          <div className='grid grid-cols-2 px-[15px] gap-x-[30px] gap-y-7 flex-1'>
            <div className='col-span-2'>
              <TextInput
                id='fullName'
                label='Full Name'
                type='text'
                //   required
                placeholder='e.g. Mensah Enoch Nana Nyankah'
                {...form}
              />
            </div>
            <div className=''>
              <TextInput
                id='emailAddress'
                label='Email Address'
                type='text'
                disabled
                //   required
                placeholder=''
                {...form}
              />
            </div>
            <div className=''>
              <TextInput
                id='phoneNumber'
                label='Phone Number'
                type='text'
                //   required
                placeholder=''
                {...form}
              />
            </div>
            <div className=''>
              <TextInput
                id='organizationName'
                label='Organization Name'
                type='text'
                //   required
                placeholder=''
                {...form}
              />
            </div>
            <div className=''>
              <TextInput
                id='country'
                label='Country'
                disabled
                type='text'
                //   required
                placeholder=''
                {...form}
              />
            </div>
          </div>
        </div>
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

export default AccountSettings;
