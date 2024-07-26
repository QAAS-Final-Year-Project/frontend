import { useMutation, useQuery } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import Modal from "Shared/components/overlays/modal";
import TextInput from "Shared/components/input/text-input";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SearchSelectInput from "Shared/components/input/search-select-input";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import { doDeposit } from "./duck/fetch";
import { showToast } from "Shared/utils/alert";
import StatusChip from "Shared/components/chips/status-chip";

export default function MakeDepositContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: doDeposit,
    onSuccess: (response) => {
      if (response.data?.paymentUrl) {
        showToast({
          type: "success",
          title: "Deposit initiated successfully",
        });
        setOpen(false);
        refetch?.();
        window.open(response.data?.paymentUrl);
      }
    },
    onError: (error) =>
      formatAndShowAxiosError(error || "Could not initiate payment"),
  });

  const form = useFormik<any>({
    initialValues: {
      amount: null,
    },
    onSubmit: async (values) => {
      mutation.mutate({
        ...values,
        id,
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
      title={"Initialize deposit"}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col  w-full items-stretch'>
          <StatusChip
            info='A payment link will be generated for payment to be made'
            type='warning'
            className='w-full block mb-4'
            size='md'
          />
          <div className='w-full'>
            <TextInput
              id='amount'
              label='Amount'
              type='number'
              required
              placeholder=''
              min={0}
              postText='GHS'
              {...form}
            />
          </div>
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
            text='Initialize Deposit'
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
