import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { clearAuth } from "Shared/utils/auth";
import { formatAndShowAxiosError } from "Shared/utils/errors";

export default function LogoutContainer({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
}) {
  return (
    <YesNoDialog
      open={open}
      setOpen={setOpen}
      title={"Are you sure ?"}
      onYesClicked={clearAuth}
      onNoTapped={() => setOpen(false)}
    >
      <div className='text-xs py-3'>
        <span>Are you sure you want to logout ?</span>
      </div>
    </YesNoDialog>
  );
}
