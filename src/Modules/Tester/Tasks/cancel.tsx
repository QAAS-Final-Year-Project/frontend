import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { formatAndShowAxiosError } from "Shared/utils/errors";

import { useFormik } from "formik";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { useParams } from "react-router-dom";
import StatusChip from "Shared/components/chips/status-chip";
import { showToast } from "Shared/utils/alert";
import { doCancelTask,  } from "./duck/fetch";
import { useEffect } from "react";

export default function CancelTaskContainer({
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
    mutationFn: doCancelTask,
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
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      title={"Start"}
      onYesClicked={form.handleSubmit}
      yesLoading={mutation.isPending}
      onNoTapped={() => setOpen(false)}
    >
      <div className='flex flex-col items-center'>
        <span className='text-lg'>
          {" "}
          Are you sure you want to place bid on this task with amount $
          {values?.rate}?
        </span>
      </div>
    </YesNoDialog>
  );
}
