import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PrimaryButton from "Shared/components/buttons/primary-button";
import UploadButton from "Shared/components/input/upload-btn";
import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useFormik } from "formik";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doResolveTask, getTask } from "./duck/fetch";
import { AxiosError } from "axios";
import Loader from "Shared/components/suspense/loader";
import RichInput from "Shared/components/input/rich-input";
import { IResolveTaskSchema, ResolveTaskSchema } from "./schema";

const TesterResolvePage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const form = useFormik<IResolveTaskSchema>({
    initialValues: {
      supportingDocuments: [],
      supportingDocumentUrls: [],
      notes: "",
    },
    validationSchema: ResolveTaskSchema,
    onSubmit: async (values) => {
      mutation.mutate({
        id: id,
        values: {
          ...values,
          supportingDocuments: values.supportingDocuments.map(
            (file: any, idx) => ({
              name: file?.name,
              url: values?.supportingDocumentUrls?.[idx],
            })
          ),
        },
      });
    },
    onReset: () => {
      // setOpen(false);
    },
  });

  const query = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  const mutation = useMutation({
    mutationFn: doResolveTask,
    onSuccess: (data) => {
      showToast({
        type: "success",
        title: "Task Resolved successful",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      setTimeout(() => {
        navigate("/dashboard/tasks/" + id);
      }, 1000);
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='Resolve Task'
          breadCrumps={[
            {
              title: "Dashboard",
              to: "/",
            },
            {
              title: "Tasks",
              to: "/",
            },
            {
              title: query?.data?.data ? "#" + query?.data?.data?.code : "",
              to: query?.data?.data
                ? `/dashboard/tasks/${query?.data?.data?._id}`
                : "",
            },
            {
              title: "Resolve",
              to: "#",
            },
          ]}
        />
      </div>
      {query.isLoading ? (
        <div className='min-h-[400px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <form className='space-y-[30px]' onSubmit={form.handleSubmit}>
          <CardSectionWrapper
            icon={"ic:outline-create-new-folder"}
            title='Task Resolution Form'
          >
            <div className='mt-[30px]  space-y-7 mb-9'>
              <div className='grid grid-cols-3  px-[30px] gap-x-[30px] gap-y-7 flex-1 mb-3'>
                <div className='col-span-3 '>
                  <RichInput
                    id='notes'
                    label='Tell the developer about your findings'
                    placeholder='eg. All good !'
                    required={true}
                    {...form}
                  />
                </div>
                <div className='col-span-2 flex gap-x-2 items-center'>
                  <label className='mt-7'>
                    <UploadButton
                      rawFilesId='supportingDocuments'
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
              </div>
            </div>
          </CardSectionWrapper>
          <PrimaryButton
            iconPosition='left'
            icon={""}
            text='Resolve Task'
            size='lg'
            disabled={mutation.isPending}
            loading={mutation.isPending}
            // loading={mutation.isPending}
            type='submit'
          />
        </form>
      )}
    </section>
  );
};

export default TesterResolvePage;
