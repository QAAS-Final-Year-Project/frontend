import { useMutation, useQuery } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import TextArea from "Shared/components/input/text-area";
import { doReviewTask } from "./duck/fetch";
import Modal from "Shared/components/overlays/modal";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { getTask } from "../Tasks/duck/fetch";
import { AxiosError } from "axios";
import StarRatingInput from "Shared/components/input/rating-input";
import { ITesterRatingSchema, TesterRatingSchema } from "./schema";

export default function ReviewTaskContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const [current] = useUrlState("current");
  const query = useQuery({
    queryKey: ["task-reviewing-tester", current],
    queryFn: () => getTask(current, ["createdBy"]),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  const mutation = useMutation({
    mutationFn: doReviewTask,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Task Reviewed successful",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<ITesterRatingSchema>({
    initialValues: {
      rating: undefined,
      review: "",
    },
    validationSchema: TesterRatingSchema,
    onSubmit: async (values) => {
      console.log(values);
      mutation.mutate({
        values: {
          ...values,
        },
        id: current,
      });
    },
    onReset: () => {
      form.resetForm();
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={"Leave a Review"}
      loading={query.isLoading}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col space-y-7'>
          <p className='  '>
            <span className=' text-zinc-500 text-base font-normal  leading-[27px]'>
              Rate your work with
            </span>{" "}
            <span>
              <Link
                to={"/developers/" + query.data?.data?.createdBy?._id}
                className=' text-blue-700 hover:text-blue-500 text-base font-medium  leading-[27px]  '
              >
                {query.data?.data?.createdBy?.fullName}
              </Link>{" "}
            </span>{" "}
            <span className=' text-zinc-500 text-base font-normal  leading-[27px]'>
              on task
            </span>{" "}
            <Link
              to={"/dashboard/tasks/" + query.data?.data?._id}
              className=' text-blue-700 hover:text-blue-500 text-base font-medium  leading-[27px]  '
            >
              {query.data?.data?.title}
            </Link>
          </p>

          <div>
            <p className='text-zinc-800 text-base font-semibold flex  gap-x-1  leading-[27px]  w-max mb-1'>
              Your Rating
            </p>
            <div className='text-start'>
              <StarRatingInput
                id='rating'
                onRatingChange={(val) => {
                  form.setFieldValue("rating", val);
                }}
                {...form}
              />
            </div>
          </div>

          <div className='w-full mb-8 text-start'>
            <TextArea
              id='review'
              label=''
              placeholder='Comment'
              required={false}
              rows={4}
              {...form}
            />
          </div>
          <PrimaryButton
            text='Leave a Review'
            className='w-full'
            loading={mutation.isPending}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  );
}
