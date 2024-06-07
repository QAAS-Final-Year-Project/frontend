import { useMutation, useQueryClient } from "@tanstack/react-query";
import OutlinedButton from "Shared/components/buttons/outline-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import DocumentUploadBox from "Shared/components/input/document-upload-box";
import SearchSelectInput from "Shared/components/input/search-select-input";
import TagsInput from "Shared/components/input/tags-input";
import TextArea from "Shared/components/input/text-area";
import TextInput from "Shared/components/input/text-input";
import UploadButton from "Shared/components/input/upload-btn";
import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useFormik } from "formik";
import _ from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doCreateTask } from "./duck/fetch";

const projectPricing = ["Fixed Price", "Hourly "];
const CreateTasksPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useFormik<any>({
    initialValues: {
      supportingDocumentUrls: [],
      title: "",
      description: "",
      amount: 0,
      tags: [],
      deadlineDate: "",
    },
    // validationSchema: TesterUserSchema,
    onSubmit: async (values) => {
      // console.log(values)
      mutation.mutate({
        ...values,
      });
    },
    onReset: () => {
      // setOpen(false);
    },
  });

  const mutation = useMutation({
    mutationFn: doCreateTask,
    onSuccess: (data) => {
      showToast({
        type: "success",
        title: "Task Created successful",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTimeout(() => {
        navigate("/dashboard/tasks");
      }, 1000);
    },
    onError: (error) => formatAndShowAxiosError(error),
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
      <form className='space-y-[30px]' onSubmit={form.handleSubmit}>
        <CardSectionWrapper
          icon={"ic:outline-create-new-folder"}
          title=' Task Submission Form'
        >
          <div className='mt-[30px]  space-y-7 mb-9'>
            <div className='grid grid-cols-3  px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
              <div className=''>
                <TextInput
                  id='title'
                  label='Task Name'
                  type='text'
                  required
                  placeholder='eg. Test this website for me'
                  {...form}
                />
              </div>
              <div className='col-span-3'>
                <TextArea
                  id='description'
                  label='Describe the task'
                  placeholder='...'
                  required={false}
                  rows={4}
                  {...form}
                />
              </div>
              <div className='col-span-2 flex gap-x-2 items-center'>
                <label>
                  <UploadButton
                    placeholder='Upload any supporting documents that will help the tester understand the task better'
                    id={`supportingDocumentUrls`}
                    label=''
                    multiple={true}
                    fileStoragePath='task-supporting-documents/'
                    // required={true}
                    {...form}
                  />
                </label>
              </div>

              <div className='grid grid-cols-4 gap gap-x-[30px] col-span-3'>
                <div>
                  <TextInput
                    id='amount'
                    label='What is your estimated budget? '
                    type='text'
                    required
                    placeholder=''
                    postText='USD'
                    {...form}
                  />
                </div>
                <div className=''>
                  <TextInput
                    id='deadlineDate'
                    label='Deadline'
                    type='date'
                    min={moment().format("YYYY-MM-DD")}
                    required={true}
                    {...form}
                  />
                </div>
                <div className='col-span-2'>
                  <TagsInput
                    id='tags'
                    label={"What skills are required? "}
                    tooltip='Choose up to 5 skills for the project'
                    //   required
                    placeholder='e.g. Unit Testing, UX Testing'
                    {...form}
                  />
                </div>{" "}
                {/* <fieldset>
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
                </fieldset> */}
              </div>
            </div>
          </div>
        </CardSectionWrapper>
        <PrimaryButton
          iconPosition='left'
          icon={""}
          text='Post a task'
          size='lg'
          disabled={mutation.isPending}
          loading={mutation.isPending}
          // loading={mutation.isPending}
          type='submit'
        />
      </form>
    </section>
  );
};

export default CreateTasksPage;
