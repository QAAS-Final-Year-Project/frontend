import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { doUpdateBid } from "./duck/fetch";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import TextArea from "Shared/components/input/text-area";
import { useEffect } from "react";
import Modal from "Shared/components/overlays/modal";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import RangeInput from "Shared/components/input/range-input";
import { IUpdateTaskBidSchema, UpdateTaskBidSchema } from "./schema";

export default function UpdateBidContainer({
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
  const [current] = useUrlState("current");
  const mutation = useMutation({
    mutationFn: doUpdateBid,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Bid updated on task successful",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<IUpdateTaskBidSchema>({
    initialValues: {
      ...values,
    },
    validationSchema: UpdateTaskBidSchema,
    onSubmit: async (values) => {
      console.log(values);
      mutation.mutate({
        values: {
          ...values,
          amount: values.amount,
        },
        id: current as any,
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
      title={"Edit Bid"}
      // onYesClicked={form.handleSubmit}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => setOpen(false)}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col'>
          <p className='mb-[5px]'>
            <span className="text-zinc-500 text-base font-normal  leading-[27px]">
              Set your{" "}
            </span>
            <span className="text-zinc-800 text-base font-bold  leading-[27px]">
              minimal rate
            </span>
          </p>
          <h6 className='text-zinc-800 text-[26px] font-medium  leading-[27px]'>
            GHC {form.values.amount}
          </h6>
          <div className='mt-6 mb-8 w-full'>
            <RangeInput
              id='amount'
              labelHidden
              min={1}
              max={values?.amount}
              {...form}
            />
          </div>
          {/* <p className='mb-3'>
            <span className="text-zinc-500 text-base font-normal  leading-[27px]">
              Set your{" "}
            </span>
            <span className="text-zinc-800 text-base font-bold  leading-[27px]">
              delivery time
            </span>
          </p>
          <div className='grid grid-cols-2 gap-5 w-full mb-[30px]'>
            <div className='p-1.5 bg-white rounded shadow  flex items-center'>
              <div className='w-9 h-9 p-[9px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded flex items-center justify-center'>
                <MinusIcon className='w-[18px h-[18px] ' />
              </div>
              <div className=' flex-1 text-center text-zinc-500 text-base font-semibold leading-9'>
                1
              </div>
              <div className='w-9 h-9 p-[9px] bg-zinc-100 hover:bg-zinc-200 cursor-pointer rounded flex items-center justify-center'>
                <PlusIcon className='w-[18px h-[18px] ' />
              </div>
            </div>
            <div className='px-5 bg-white rounded shadow  justify-start flex items-center'>
              <span className=' text-zinc-500 text-base font-medium text-left  leading-[48px]'>
                Days
              </span>
            </div>
          </div> */}
          <div className='w-full mb-8 text-start'>
            <TextArea
              id='notes'
              label=''
              placeholder='Notes'
              required={false}
              rows={4}
              {...form}
            />
          </div>
          <PrimaryButton
            text='Send'
            className='w-full'
            loading={mutation.isPending}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  );
}
