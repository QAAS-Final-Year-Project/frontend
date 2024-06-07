import { FC, useId } from "react";
import {
  ArrowPathIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import "react-tooltip/dist/react-tooltip.css";
import { classNames, wrapClick } from "../../utils/ui";
import { Tooltip } from "react-tooltip";

const Actions = ["update", "view", "delete", "renew"] as const;
export type Action = (typeof Actions)[number];
const ActionIcons: { [key in Action]: typeof EyeIcon } = {
  update: PencilSquareIcon,
  view: EyeIcon,
  delete: TrashIcon,
  renew: ArrowPathIcon, // Assign the renew icon
};

interface ActionButtonProps {
  action: Action;
  onClick: (...val: any) => any;
  disabled?: boolean;
  tooltip?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  action,
  onClick,
  disabled = false,
  tooltip,
}) => {
  const Icon = ActionIcons[action];
  const id = useId();

  return (
    <>
      {tooltip && (
        <Tooltip anchorSelect={`#${id}`} place='right-start'>
          {tooltip}
        </Tooltip>
      )}
      <button
        type='button'
        id={id}
        onClick={wrapClick(onClick)}
        disabled={disabled}
        className={classNames(
          disabled
            ? "cursor-not-allowed text-gray-500 hover:bg-gray-300"
            : "text-gray-500 hover:bg-gray-300 hover:text-gray-900",
          "inline-flex items-center justify-center rounded-[4px] w-8 h-8 border border-transparent p-1 bg-zinc-100  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        )}
      >
        <Icon
          className={classNames("w-5 h-5 text-[#666666]")}
          aria-hidden='true'
        />
      </button>
    </>
  );
};
export default ActionButton;
