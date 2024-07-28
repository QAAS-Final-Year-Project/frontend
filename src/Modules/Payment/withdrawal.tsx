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
import { doDeposit, doWithdraw } from "./duck/fetch";
import { showToast } from "Shared/utils/alert";
import StatusChip from "Shared/components/chips/status-chip";
import TextArea from "Shared/components/input/text-area";
import { IWithdrawSchema } from "./schema";

export default function InitiateWithdrawalContainer({
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
    mutationFn: doWithdraw,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Withdrawal initiated successfully",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) =>
      formatAndShowAxiosError(error || "Could not initiate withdrawal"),
  });

  const form = useFormik<IWithdrawSchema>({
    initialValues: {
      amount: null,
      paymentMethod: undefined,
      paymentAccount: "",
      notes: "",
      accepted: false,
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
      title={"Initialize Withdrawal"}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col  w-full items-stretch space-y-6'>
          <StatusChip
            info='A withdrawal request will  be generated and we will process your withdrawal in 24 to 48 hours'
            type='warning'
            className=' block  flex-wrap  max-w-full text-start'
            size='md'
          />

          <div className='text-start'>
            <SearchSelectInput
              id='paymentMethod'
              label='Payment Method'
              required
              options={[
                { label: { title: "Mobile Money" }, value: "MobileMoney" },
                { label: { title: "Bank" }, value: "Bank" },
              ]}
              placeholder='Select Payment Method'
              {...form}
            />
          </div>

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
          <div className='w-full'>
            <TextInput
              id='paymentAccount'
              label='Account Number'
              type='text'
              required
              placeholder=''
              {...form}
            />
          </div>

          <div className='w-full text-start'>
            <TextArea
              id='notes'
              label='Extra details'
              // required
              placeholder='Branch name, notes, etc'
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
