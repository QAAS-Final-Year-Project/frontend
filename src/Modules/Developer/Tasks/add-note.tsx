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
import { useParams } from "react-router-dom";
import StatusChip from "Shared/components/chips/status-chip";
import TextArea from "Shared/components/input/text-area";
import SelectInput from "Shared/components/input/select-input";

export default function AddNoteContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const { id } = useParams();

  //   const mutation = useMutation({
  //     mutationFn: ()=>,
  //     onSuccess: (response) => {
  //       showToast({
  //         type: "success",
  //         title: "Member Subscription renewed successful",
  //       });
  //       setOpen(false);
  //       refetch?.();
  //     },
  //     onError: (error) => formatAndShowAxiosError(error),
  //   });

  const form = useFormik<any>({
    initialValues: {
      amount: null,
      ref: "",
      method: "",
    },
    onSubmit: async (values) => {
      //   mutation.mutate({
      //     ...values,
      //     memberId: id,
      //   });
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
      title={"Add note"}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <div className='flex flex-col items-center'>
        <h6 className=" text-center mb-3.5 text-zinc-800 text-2xl font-bold font-['Nunito'] leading-[27px]">
          Do Not Forget 😎
        </h6>
        <div className="w-full mb-2">
          <SelectInput
            id='priority'
            label=''
            placeholder="Priority"
            options={[
            //   { label: "", value: "" },
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
            // required={true}
            {...form}
          />
        </div>

        <div className='w-full mb-8'>
          <TextArea
            id='Note'
            label=''
            placeholder='I am...'
            required={false}
            rows={4}
            {...form}
          />
        </div>
        <PrimaryButton text='Add Note' className='w-full' />
      </div>
    </Modal>
  );
}
