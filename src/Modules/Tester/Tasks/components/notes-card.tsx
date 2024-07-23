import ActionButton from "Shared/components/buttons/action-button";
import { classNames } from "Shared/utils/ui";
import moment from "moment";
import { FC } from "react";

interface NoteCardProps {
  note: string;
  priority: string;
  date: string;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "text-neutral-500";
  }
};

const NoteCard: FC<NoteCardProps> = ({ note, priority,date, onDelete, onUpdate }) => {
  return (
    <div className='note-card'>
      <div className='space-y-5'>
        <div className="w-full flex items-center justify-between">
        <p className=' text-neutral-500 text-sm font-normal  leading-normal'>
          {note}
        </p>
        <span className="text-neutral-400 text-sm font-normal  leading-snug">
          {moment(date).fromNow()}
          </span>
        </div>
      
        <div className='flex items-center w-full justify-between'>
          <div
            className={classNames(
              "px-[9px] py-[6px] rounded  justify-start items-start inline-flex",
              getPriorityClass(priority)
            )}
          >
            <span className='text-white text-sm font-normal  capitalize leading-tight'>
              {priority} Priority
            </span>
          </div>

          <div className='flex items-center  '>
            {/* <ActionButton action='update' onClick={onUpdate} /> */}
        {onDelete &&   <ActionButton action='delete' onClick={onDelete} /> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
