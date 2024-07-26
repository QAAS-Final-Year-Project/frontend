import { FC, useId } from "react";
import {
  ArrowPathIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
  BanknotesIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { classNames, wrapClick } from "../../utils/ui";
import { Tooltip } from "react-tooltip";

const Actions = [
  "update",
  "view",
  "delete",
  "renew",
  "resolve",
  "cancel",
  "start",
  "goto",
  "complete",
  "completePay",
  "updateDate"
] as const;
export type Action = (typeof Actions)[number];
const ActionIcons: { [key in Action]: typeof EyeIcon } = {
  update: PencilSquareIcon,
  view: EyeIcon,
  delete: TrashIcon,
  renew: ArrowPathIcon,
  resolve: ClipboardDocumentListIcon,
  cancel: XCircleIcon,
  start: ClipboardDocumentCheckIcon,
  goto: ArrowTopRightOnSquareIcon,
  complete: CheckCircleIcon,
  completePay: BanknotesIcon,
  updateDate: CalendarIcon, // Assign an icon to the new action

};

interface ActionButtonProps {
  action: Action;
  onClick: (...val: any) => any;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  iconClassName?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  action,
  onClick,
  disabled = false,
  tooltip,
  className,
  iconClassName,
}) => {
  const Icon = ActionIcons[action];

  return (
    <div>
      {tooltip && (
        <Tooltip anchorSelect={`#tooltip-${action}`} place='top'>
          {tooltip}
        </Tooltip>
      )}
      {/* <div className='w-80 h-16 ' </div> */}
      <button
        type='button'
        id={`tooltip-${action}`}
        onClick={wrapClick(onClick)}
        disabled={disabled}
        className={classNames(
          disabled
            ? "cursor-not-allowed text-gray-500 hover:bg-gray-300"
            : "text-gray-500 hover:bg-gray-300 hover:text-gray-900",
          "inline-flex items-center justify-center rounded-[4px] w-8 h-8 border border-transparent p-1 bg-zinc-100  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          className
        )}
      >
        <Icon
          className={classNames("w-5 h-5 text-[#666666]", iconClassName)}
          aria-hidden='true'
        />
      </button>
    </div>
  );
};
export default ActionButton;
