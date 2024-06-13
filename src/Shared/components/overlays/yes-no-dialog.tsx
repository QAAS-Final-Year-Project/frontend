import { PropsWithChildren, useEffect } from "react";
import IconButton from "../buttons/icon-button";
import { classNames, wrapClick } from "Shared/utils/ui";
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
  yesColor?: string;
  noColor?: string;
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
  yesColor,
  noColor,
}) => {
  useEffect(() => {}, []);

  if (!open) {
    return <></>;
  }

  return (
    <div
      className='fixed flex z-[1000] justify-center
                        items-center p-2 top-0 left-0
                        w-screen h-screen bg-gray/10
                        backdrop-brightness-50'
    >
      <div className={"w-96 bg-white border rounded"}>
        <div
          className=' flex
                                items-stretch'
        >
          <div className="text-blue-700 text-base font-semibold font-['Nunito'] leading-[62px] px-[31px]">
            <h3>{title}</h3>{" "}
          </div>
          <div className='flex-1 bg-stone-50 border rounded border-t-0  rounded-r-none rounded-t-none'></div>
          <button
            className='p-5 bg-stone-50 border-b'
            onClick={() => {
              setOpen(false);
            }}
          >
            <IconButton icon='mdi:times' className={"cursor-pointer"} />
          </button>
        </div>

        <div className='py-5 px-[30px]'>{children}</div>

        <div
          className='grid gap-x-4
                                grid-cols-2 pb-2 px-[30px]'
        >
          <PrimaryButton
            onClick={wrapClick(onNoTapped)}
            loading={false}
            className={classNames(noColor)}
            text={noTitle ? noTitle : "No"}
          />

          <PrimaryButton
            onClick={wrapClick(onYesClicked)}
            loading={yesLoading}
            className={classNames(yesColor)}
            text={yesTitle ? yesTitle : "Yes"}
          />
        </div>
      </div>
    </div>
  );
};

export default YesNoDialog;
