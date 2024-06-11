import ActionButton from "Shared/components/buttons/action-button";
import { FC } from "react";
import { Link } from "react-router-dom";

interface AttachmentCardProps {
  fileName: string;
  fileUrl: string;
}

const AttachmentCard: FC<AttachmentCardProps> = ({ fileName, fileUrl }) => {
  const fileExt = fileName?.split(".")?.pop()?.toLowerCase();
  return (
    <Link
      to={fileUrl}
      className='attachment-box cursor-pointer hover:bg-gray-300'
      target='_blank'
      // download
      rel='noreferrer'
    >
      <span>{fileName}</span>
      <i>{fileExt?.toUpperCase() || "N/A"}</i>
    </Link>
  );
};

export default AttachmentCard;
