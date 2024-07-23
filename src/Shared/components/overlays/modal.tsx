import IconButton from "../buttons/icon-button";
import { classNames, wrapClick } from "Shared/utils/ui";
import PrimaryButton from "../buttons/primary-button";
import Loader from "../suspense/loader";
import { FC, Fragment, useRef, PropsWithChildren } from "react";

import { Dialog, Transition } from "@headlessui/react";

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
  if (!open) {
    return <></>;
  }
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className={classNames("theme", "fixed z-10 inset-0 overflow-y-auto")}
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={classNames(
                "inline-block align-middle bg-white w-[540px]    overflow-hidden  transform transition-all  "
              )}
            >
              <div
                className=' flex
            items-stretch'
              >
                <div className="text-blue-700 text-base font-semibold  leading-[62px] px-[31px]">
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
                <div className='min-h-[200px] flex items-center justify-center'>
                  <Loader />
                </div>
              ) : (
                <div className='py-[50px] px-[35px]'>{children}</div>
              )}{" "}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

