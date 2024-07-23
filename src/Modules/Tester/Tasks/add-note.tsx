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
import { showToast } from "Shared/utils/alert";
import { doAddNote } from "./duck/fetch";

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
  const mutation = useMutation({
    mutationFn: doAddNote,
    onSuccess: (response) => {
      showToast({
        title: "Note added successful",
        type: "success",
      });
      refetch?.();
      setOpen(false);
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const form = useFormik<any>({
    initialValues: {
      note: "",
      priority: "",
    },
    onSubmit: async (values) => {
      mutation.mutate({
        id,
        values,
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
      title={"Add note"}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col items-center'>
          <h6 className=" text-center mb-3.5 text-zinc-800 text-2xl font-bold  leading-[27px]">
            Do Not Forget 😎
          </h6>
          <div className='w-full mb-2'>
            <SelectInput
              id='priority'
              label=''
              placeholder='Priority'
              options={[
                //   { label: "", value: "" },
                { label: "Low", value: "Low" },
                { label: "Medium", value: "Medium" },
                { label: "High", value: "High" },
              ]}
              required={true}
              {...form}
            />
          </div>

          <div className='w-full mb-8'>
            <TextArea
              id='note'
              label=''
              placeholder='I am...'
              required={false}
              rows={4}
              {...form}
            />
          </div>
          <PrimaryButton
            text='Add Note'
            type="submit"
            className='w-full'
            loading={mutation.isPending}
          />
        </div>
      </form>
    </Modal>
  );
}
