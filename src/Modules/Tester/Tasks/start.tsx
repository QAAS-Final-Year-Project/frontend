import { useMutation, useQuery } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Modal from "Shared/components/overlays/modal";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { useParams } from "react-router-dom";
import StatusChip from "Shared/components/chips/status-chip";
import { showToast } from "Shared/utils/alert";
import { useEffect } from "react";
import { doStartTask } from "./duck/fetch";

export default function AcceptTaskContainer({
  open,
  setOpen,
  refetch,
  values,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
  values: any;
}) {
  const { id } = useParams();
  const [current] = useUrlState("current");
  const mutation = useMutation({
    mutationFn: doStartTask,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Task started successful",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<any>({
    initialValues: {
      ...values,
      accepted: false,
    },
    onSubmit: async (values) => {
      console.log(values);
      mutation.mutate({
        values: {
          ...values,
          amount: values.amount,
        },
        id: id,
      });
    },
    onReset: () => {
      form.resetForm();
      setOpen(false);
    },
  });
  useEffect(() => {
    form.setValues(values);
  }, [current]);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={"Start"}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col items-center'>
          <h6 className=" text-center mb-3.5 text-zinc-800 text-2xl font-bold  leading-[27px]">
            Are you sure you want to begin working on this task at an agreed
            amount of
          </h6>

          <StatusChip
            info={`GHC${form.values?.amount}`}
            type='success'
            size='md'
          />
          <div className='flex items-center mt-9 mb-8 w-full text-start'>
            <input
              id={"accept-radio"}
              name='notification-method'
              type='radio'
              onChange={(e) => {
                console.log("value is ", e.target.value);
                form.setFieldValue("accepted", !!e.target.value);
              }}
              className='h-[18px] w-[18px] border-zinc-400 text-primary-600 focus:ring-primary-600'
            />
            <label
              htmlFor={"accept-radio"}
              className='ml-3 block text-stone-500 text-base font-normal leading-[25px]'
            >
              I have read and agree to the Terms and Conditions
            </label>
          </div>

          <PrimaryButton
            text='Accept'
            disabled={!form.values.accepted}
            className='w-full'
            loading={mutation.isPending}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  );
}
