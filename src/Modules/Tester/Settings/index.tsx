import { Icon } from "@iconify/react";
import RangeInput from "Shared/components/input/range-input";
import TagsInput from "Shared/components/input/tags-input";
import TextInput from "Shared/components/input/text-input";
import Avatar from "Shared/components/media/avatar";
import BreadCrumps from "Shared/components/nav/bread-crumps";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import useCookies from "Shared/hooks/cookies";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import AttachmentCard from "./components/attachment-card";
import SearchSelectInput from "Shared/components/input/search-select-input";
import _ from "lodash";
import { Countries } from "data/index.types";
import TextArea from "Shared/components/input/text-area";
import CheckBox from "Shared/components/input/check-box";
import PrimaryButton from "Shared/components/buttons/primary-button";
import MinimalFooter from "Shared/layout/footer/minimal-footer";
import Header from "Shared/components/layout/header";

const sampleAttachments = [
  {
    id: "1",
    fileUrl:
      "https://www.vasterad.com/themes/hireo_21/images/user-avatar-placeholder.png",
    title: "File 1",
  },
  {
    id: "2",
    fileUrl:
      "https://www.vasterad.com/themes/hireo_21/images/user-avatar-placeholder.png",
    title: "File 2",
  },
];
const Settings: FC = () => {
  //TODO: add valdidation schema
  const [user] = useCookies("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const form = useFormik<any>({
    initialValues: {
      emailAddress: parsedUser?.emailAddress,
      fullName: parsedUser?.fullName,
      country: parsedUser?.country,
      skills: [],
      rate: 0,
      //   password: "",
      //   confirmPassword: "",
    },
    // validationSchema: TesterUserSchema,
    onSubmit: async (values) => {
      //   mutation.mutate(values);
    },
    onReset: () => {
      // setOpen(false);
    },
  });

  useEffect(() => {
    console.log(form.values);
  }, [form.values]);
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='Settings'
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Dashboard",
              to: "/",
            },
            {
              title: "Settings",
              to: "#",
            },
          ]}
        />
        <div className='space-y-[30px]'>
          <CardSectionWrapper
            icon={"ic:outline-account-circle"}
            title='My Account'
          >
            <div className='mt-[30px] mb-9 flex gap-x-6 mr-[30px]'>
              <div className='pl-4'>
                <Avatar
                  alt={parsedUser?.fullName}
                  src='https://www.vasterad.com/themes/hireo_21/images/user-avatar-placeholder.png'
                  size='2xl'
                  shape='square'
                />
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
              </div>
            </div>
          </CardSectionWrapper>
          <CardSectionWrapper icon={"ic:outline-face"} title='My Profile'>
            <div className='mt-[30px]  space-y-7 mb-9'>
              <div className='grid grid-cols-3  gap-x-[30px] px-[30px] gap-y-7 border-b border-neutral-200 pb-[30px] flex-1'>
                <div className=''>
                  <p>
                    <span className="text-zinc-500 text-base font-normal font-['Nunito'] leading-[27px]">
                      Set your{" "}
                    </span>
                    <span className="text-zinc-800 text-base font-semibold font-['Nunito'] leading-[27px]">
                      minimal hourly rate
                    </span>
                  </p>
                  <span className='block mt-[5px] mb-2.5 text-zinc-800 text-[26px] font-medium leading-[27px]'>
                    $35
                  </span>
                  <RangeInput id='rate' min={1} max={100} {...form} />
                </div>

              
                <div>
                  <span className='text-zinc-800 text-base   leading-[27px]'>
                    Attachments
                  </span>
                  <div className='grid grid-cols-2'>
                    {sampleAttachments.map((attachment) => (
                      <AttachmentCard {...attachment} />
                    ))}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 px-[30px] gap-x-[15px] gap-y-7 flex-1 '>
                <div className=''>
                  <TextInput
                    id='tagline'
                    label='Tagline'
                    type='text'
                    //   required
                    {...form}
                  />
                </div>
                <div>
                  <SearchSelectInput
                    id='country'
                    label={`Country`}
                    placeholder='Select Country'
                    options={[
                      ..._.map(Countries).map((nationality) => ({
                        label: {
                          title: nationality,
                        },
                        value: nationality,
                      })),
                    ]}
                    disabled={true}
                    // required={true}
                    {...form}
                  />
                </div>
                <div className='col-span-3'>
                  <TextArea
                    id='introduction'
                    label='Introduce yourself'
                    placeholder='I am...'
                    required={false}
                    rows={4}
                    {...form}
                  />
                </div>
              </div>
            </div>
          </CardSectionWrapper>
          <CardSectionWrapper
            icon={"ic:outline-lock"}
            title='Password & Security'
          >
            <div className='mt-[30px]  space-y-7 mb-9'>
              <div className='grid grid-cols-3  px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
                <div className=''>
                  <TextInput
                    id='currentPassword'
                    label='Current Password'
                    type='password'
                    //   required
                    placeholder=''
                    {...form}
                  />
                </div>
                <div className=''>
                  <TextInput
                    id='newPassword'
                    label='New Password'
                    type='password'
                    //   required
                    placeholder=''
                    {...form}
                  />
                </div>
                <div className=''>
                  <TextInput
                    id='repeatNewPassword'
                    label='Repeat New Password'
                    type='password'
                    //   required
                    placeholder=''
                    {...form}
                  />
                </div>
              </div>
              <div className='px-[30px]'>
                <CheckBox
                  id='2fa'
                  label='Enable Two-Step Verification via Email'
                  checked={false}
                  {...form}
                />
              </div>
              <div></div>
            </div>
          </CardSectionWrapper>
          <PrimaryButton
            text='Save Changes'
            size='lg'
            // loading={mutation.isPending}
            type='submit'
          />
        </div>
      </div>
      <MinimalFooter />
    </section>
  );
};

export default Settings;
