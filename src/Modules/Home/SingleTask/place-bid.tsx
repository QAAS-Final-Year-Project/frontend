import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { doBidTask } from "../duck/fetch";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import TextArea from "Shared/components/input/text-area";

export default function PlaceBidContainer({
  open,
  setOpen,
  values,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
  values: any;
}) {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: doBidTask,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Bid place on task successful",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<any>({
    initialValues: {
      notes: "",
      ...values,
    },
    onSubmit: async (values) => {
      mutation.mutate({
        values: {
          ...values,
          amount: values.rate,
        },
        id,
      });
    },
    onReset: () => {
      form.resetForm();
      setOpen(false);
    },
  });

  return (
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      title={"Are you sure ?"}
      onYesClicked={form.handleSubmit}
      yesLoading={mutation.isPending}
      onNoTapped={() => setOpen(false)}
    >
      <div className='flex flex-col items-center'>
        <span className='text-lg'>
          {" "}
          Are you sure you want to place bid on this task with amount GHC
          {values?.rate}?
        </span>
        <div className='w-full mb-8'>
          <TextArea
            id='notes'
            label=''
            placeholder='Notes'
            required={false}
            rows={4}
            {...form}
          />
        </div>
      </div>
    </YesNoDialog>
  );
}
