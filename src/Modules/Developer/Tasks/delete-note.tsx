import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { deleteTaskNote } from "./duck/fetch";
import { useParams } from "react-router-dom";

export default function DeleteNoteContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  const [current] = useUrlState<string>("current");
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: () => deleteTaskNote(id, current),
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Note deleted successful",
      });
      refetch?.();
      setOpen(false);
      
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  return (
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      
      title={"Are you sure ?"}
      yesColor="bg-red-500"
      onYesClicked={mutation.mutate}
      yesLoading={mutation.isPending}
      onNoTapped={() => setOpen(false)}
    >
      <div className=' py-3'>
        <span>Are you sure you want to delete this note?</span>
      </div>
    </YesNoDialog>
  );
}
