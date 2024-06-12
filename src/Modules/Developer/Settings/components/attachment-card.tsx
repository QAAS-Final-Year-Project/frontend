import { FC } from "react";

interface AttachmentCardProps {
  title: string;
  fileUrl: string;
}

const AttachmentCard: FC<AttachmentCardProps> = ({ title, fileUrl }) => {
  const fileExt = fileUrl?.split(".")?.pop()?.toLowerCase();
  return (
    <div className='attachment-box'>
      <span>{title}</span>
      <i>{fileExt?.toUpperCase() || "N/A"}</i>
    </div>
  );
};

export default AttachmentCard;
