import { PropsWithChildren, useEffect } from "react";
import IconButton from "../buttons/icon-button";
import { wrapClick } from "Shared/utils/ui";
import PrimaryButton from "../buttons/primary-button";

interface YesNoDialogProps {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  onNoTapped: () => void;
  noTitle?: string;
  onYesClicked: () => void;
  yesLoading?: boolean;
  yesTitle?: string;
}

const YesNoDialog: React.FC<PropsWithChildren<YesNoDialogProps>> = ({
  open,
  setOpen,
  title,
  children,
  onNoTapped,
  onYesClicked,
  yesLoading = false,
  yesTitle,
  noTitle,
}) => {
  useEffect(() => {}, []);

  if (!open) {
    return <></>;
  }

  return (
    <div
      className='absolute flex z-10 justify-center
                        items-center p-2 top-0 left-0
                        w-screen h-screen bg-gray/10
                        backdrop-brightness-50'
    >
      <div className={"w-96 bg-white border px-4 rounded"}>
        <div
          className='border-b py-3 flex
                                items-center justify-between'
        >
          <h3
            className='text-sm font-proximaBold
                                   text-blue-900 text-gray-700'
          >
            {title}
          </h3>

          <IconButton
            icon='uil:times-circle'
            onClick={() => {
              setOpen(false);
            }}
            className={"cursor-pointer"}
          />
        </div>

        <div className='py-3 px-3'>{children}</div>

        <div
          className='grid gap-x-4
                                grid-cols-2 pb-2'
        >
          <PrimaryButton
            onClick={wrapClick(onNoTapped)}
            loading={false}
            className={"bg-gray-500 text-white"}
            text={noTitle ? noTitle : "No"}
          />

          <PrimaryButton
            onClick={wrapClick(onYesClicked)}
            loading={yesLoading}
            text={yesTitle ? yesTitle : "Yes"}
          />
        </div>
      </div>
    </div>
  );
};

export default YesNoDialog;
