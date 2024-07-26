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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import StatusChip from "Shared/components/chips/status-chip";
import TextArea from "Shared/components/input/text-area";
import { getSingleTester } from "Modules/Home/duck/fetch";
import { getDeveloperUser, getTesterUser } from "./duck/fetch";
import { doCreateRoom } from "./duck/firestore";

export default function SendNewMessageContainer({
  open,
  setOpen,
  refetch,
  currentUser,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
  currentUser: any;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toType] = useUrlState("toType");
  const [current] = useUrlState("current");
  const query = useQuery({
    queryKey: [toType, current],
    queryFn: () =>
      toType == "DeveloperUser"
        ? getDeveloperUser(current as string, {
            select: ["fullName", "profileImageUrl"],
          })
        : getTesterUser(current as string, {
            select: ["fullName", "profileImageUrl"],
          }),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });

  const mutation = useMutation({
    mutationFn: doCreateRoom,
    onSuccess: (response) => {
      const audio = new Audio("./send-message.ogg");
      audio.play();
      navigate(`/dashboard/messages/${response.roomId}`);
      searchParams.delete("current");
      searchParams.delete("modal");
      searchParams.delete("toType");
      setSearchParams(searchParams);
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const form = useFormik<any>({
    initialValues: {
      message: "",
    },
    onSubmit: async (values) => {
      mutation.mutate({
        message: values.message,
        accountType: currentUser?.accountType,
        developerFullName:
          currentUser?.accountType == "DeveloperUser"
            ? currentUser?.fullName
            : query.data.data?.fullName,
        developerProfileImageUrl:
          currentUser?.accountType == "DeveloperUser"
            ? currentUser?.profileImageUrl
            : query.data.data?.profileImageUrl,
        developerId:
          currentUser?.accountType == "DeveloperUser"
            ? currentUser?._id
            : current,
        testerFullName:
          currentUser?.accountType == "TesterUser"
            ? currentUser?.fullName
            : query.data.data?.fullName,
        testerProfileImageUrl:
          currentUser?.accountType == "TesterUser"
            ? currentUser?.profileImageUrl
            : query.data.data?.profileImageUrl,
        testerId:
          currentUser?.accountType == "TesterUser" ? currentUser?._id : current,
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
      title={"Send Message"}
      loading={query.isLoading}
      // onYesClicked={mutation.mutate}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => {}}
    >
      <form onSubmit={form.handleSubmit} className='flex flex-col items-center'>
        <h6 className=' text-center mb-3.5 text-zinc-800 text-2xl font-bold  leading-[27px]'>
          Direct Message To {query?.data?.data?.fullName}
        </h6>
        <div className='w-full mb-8'>
          <TextArea
            id='message'
            label=''
            placeholder='I am...'
            disabled={mutation.isPending}
            required={false}
            rows={4}
            {...form}
          />
        </div>
        <PrimaryButton
          type='submit'
          text='Send'
          className='w-full'
          disabled={mutation.isPending}
          loading={mutation.isPending}
        />
      </form>
    </Modal>
  );
}
