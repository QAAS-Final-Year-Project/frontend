import OutlinedButton from "Shared/components/buttons/outline-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SearchSelectInput from "Shared/components/input/search-select-input";
import TagsInput from "Shared/components/input/tags-input";
import TextArea from "Shared/components/input/text-area";
import TextInput from "Shared/components/input/text-input";
import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { useFormik } from "formik";
import { FC } from "react";

const projectPricing = ["Fixed Price", "Hourly "];
const CreateTasksPage: FC = () => {
  // const [user] = useCookies("user");
  const form = useFormik<any>({
    initialValues: {
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

  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='Post a Task'
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
              title: "Post a Task",
              to: "#",
            },
          ]}
        />
      </div>
      <div className='space-y-[30px]'>
        <CardSectionWrapper
          icon={"ic:outline-create-new-folder"}
          title=' Task Submission Form'
        >
          <div className='mt-[30px]  space-y-7 mb-9'>
            <div className='grid grid-cols-3  px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
              <div className=''>
                <TextInput
                  id='name'
                  label='Project Name'
                  type='text'
                  //   required
                  placeholder='eg. Test this website for me'
                  {...form}
                />
              </div>
              <div>
                <SearchSelectInput
                  id='category'
                  label={`Category`}
                  placeholder='Select Category'
                  options={
                    [
                      // ...lodash.map(Countries).map((nationality) => ({
                      //   label: {
                      //     title: nationality,
                      //   },
                      //   value: nationality,
                      // })),
                    ]
                  }
                  required={true}
                  {...form}
                />
              </div>
              <div className=''>
                <TextInput
                  id='location'
                  label='Location'
                  type='text'
                  //   required
                  placeholder='eg. Test this website for me'
                  tooltip='location'
                  {...form}
                />
              </div>
              <div className='grid grid-cols-4 gap gap-x-[30px] col-span-3'>
                <div>
                  <TextInput
                    id='min'
                    label='What is your estimated budget? '
                    type='text'
                    //   required
                    placeholder='Minimum'
                    postText='USD'
                    {...form}
                  />
                </div>
                <div>
                  <TextInput
                    id='min'
                    type='text'
                    label={"-"}
                    //   required
                    placeholder='Maximum'
                    postText='USD'
                    {...form}
                  />
                </div>
                <div className='col-span-2'>
                  <TagsInput
                    id='skills'
                    label={"What skills are required? "}
                    tooltip='Choose up to 5 skills for the project'
                    //   required
                    placeholder='e.g. Unit Testing, UX Testing'
                    {...form}
                  />
                </div>{" "}
                <fieldset>
                  <div className='flex items-center gap-x-[15px]'>
                    {projectPricing.map((pricing) => (
                      <div key={pricing} className='flex items-center'>
                        <input
                          id={pricing}
                          name='notification-method'
                          type='radio'
                          defaultChecked={pricing === "Hourly"}
                          className='h-[18px] w-[18px] border-zinc-400 text-primary-600 focus:ring-primary-600'
                        />
                        <label
                          htmlFor={pricing}
                          className='ml-3 block text-stone-500 text-base font-normal leading-[25px]'
                        >
                          {pricing}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className='col-span-3'>
                <TextArea
                  id='introduction'
                  label='Describe the project'
                  placeholder='Tes'
                  required={false}
                  rows={4}
                  {...form}
                />
              </div>
              <div className='col-span-2 flex gap-x-2 items-center'>
                <OutlinedButton
                  text='Upload files'
                  size='md'
                  // loading={mutation.isPending}
                  type='button'
                />
                <div className='text-zinc-500 text-sm font-normal leading-snug'>
                  Images or documents that might be helpful in describing your
                  project
                </div>{" "}
              </div>
            </div>
          </div>    
        </CardSectionWrapper>
        <PrimaryButton
        iconPosition="left"
        icon={""}
          text='Post a task'
          size='lg'
          // loading={mutation.isPending}
          type='submit'
        />
      </div>
    </section>
  );
};

export default CreateTasksPage;
