import { PropsWithChildren, useEffect } from "react";
import IconButton from "../buttons/icon-button";
import { wrapClick } from "Shared/utils/ui";
import PrimaryButton from "../buttons/primary-button";
import Loader from "../suspense/loader";

interface ModalProps {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  loading?: boolean;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  setOpen,
  title,
  children,
  loading,
}) => {
  // useEffect(() => {}, []);

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
      <div className={"w-[540px] bg-white border  rounded"}>
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
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className='py-[50px] px-[35px]'>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
