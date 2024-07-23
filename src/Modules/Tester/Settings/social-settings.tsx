import PrimaryButton from "Shared/components/buttons/primary-button";
import TextInput from "Shared/components/input/text-input";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { useFormik } from "formik";
import { FC } from "react";
import { ISocialSettings, SocialSettingsSchema } from "./schema";
import OutlinedButton from "Shared/components/buttons/outline-button";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { showToast } from "Shared/utils/alert";
import { useMutation } from "@tanstack/react-query";
import {  doUpdateTesterUserSocialLinks } from "./duck/fetch";
import _ from "lodash";

const SocialSettings: FC<{ user: any }> = ({ user }) => {
  const mutation = useMutation({
    mutationFn: doUpdateTesterUserSocialLinks,
    onSuccess: (data) => {
      showToast({
        type: "success",
        title: "Social Links Updated",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) =>
      formatAndShowAxiosError(error, "Error updating social links"),
  });
  const form = useFormik<ISocialSettings>({
    initialValues: {
      twitter: user?.socialLinks?.twitter,
      linkedIn: user?.socialLinks?.linkedIn,
      github: user?.socialLinks?.github,
      website: user?.socialLinks?.website,
    },
    validationSchema: SocialSettingsSchema,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    onReset: () => {},
  });
  return (
    <CardSectionWrapper icon={"ic:baseline-public"} title='Social Links'>
      <form onSubmit={form.handleSubmit}>
        <div className='grid grid-cols-3 mt-8  px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
          <div className=''>
            <TextInput
              id='twitter'
              label='Twitter'
              type='url'
              icon='skill-icons:twitter'
              placeholder='Twitter Profile'
              {...form}
            />
          </div>
          <div className=''>
            <TextInput
              id='linkedIn'
              label='LinkedIn'
              type='url'
              icon='skill-icons:linkedin'
              placeholder='LinkedIn Profile'
              {...form}
            />
          </div>
          <div className=''>
            <TextInput
              id='github'
              label='Github'
              type='url'
              icon='skill-icons:github-dark'
              placeholder='Github Profile'
              {...form}
            />
          </div>
          <div className='mb-4 col-span-3'>
            <TextInput
              id='website'
              label='Website'
              type='url'
              placeholder='Website URL'
              icon='ic:baseline-language'
              required
              {...form}
            />
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

export default SocialSettings;
