import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { clearAuth } from "Shared/utils/auth";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { doCancelBid } from "./duck/fetch";

export default function CancelBidContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const [current] = useUrlState<string>("current");
  const mutation = useMutation({
    mutationFn: () => doCancelBid(current),
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Bid cancelled  successful",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  return (
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      title={"Cancel Bid"}
      onYesClicked={mutation.mutate}
      yesLoading={mutation.isPending}
      onNoTapped={() => setOpen(false)}
      yesColor='!bg-red-500 !border-red-500'
    >
      <div className='text-xs py-3'>
        <span className='text-lg'>
          Are you sure you want to remove your bid on this task?
        </span>
      </div>
    </YesNoDialog>
  );
}
