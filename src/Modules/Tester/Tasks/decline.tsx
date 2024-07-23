import { useMutation } from "@tanstack/react-query";
import { doCancelBid } from "Modules/Tester/Bids/duck/fetch";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { clearAuth } from "Shared/utils/auth";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { doCancelTask } from "./duck/fetch";
import { useNavigate, useParams } from "react-router-dom";

export default function DeclineTaskContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: doCancelTask,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Task declined successful",
      });

      setOpen(false);
      refetch?.();
      navigate("/tasks");
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  return (
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      title={"Decline task"}
      onYesClicked={() =>
        mutation.mutate({
          id,
        })
      }
      yesLoading={mutation.isPending}
      onNoTapped={() => setOpen(false)}
      yesColor='!bg-red-500 !border-red-500'
    >
      <div className='text-xs py-3'>
        <span className='text-lg'>
          Are you sure you no longer want to work on this task
        </span>
      </div>
    </YesNoDialog>
  );
}
