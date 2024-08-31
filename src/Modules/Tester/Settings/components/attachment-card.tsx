import { FC } from "react";

interface AttachmentCardProps {
  title: string;
  fileUrl: string;
}

const AttachmentCard: FC<AttachmentCardProps> = ({ title, fileUrl }) => {
  const fileExt = title?.split(".")?.pop()?.toLowerCase();
  return (
    <div className='attachment-box cursor-pointer hover:bg-gray-200' onClick={()=>{
      window.open(fileUrl)
    }}>
      <span>{title}</span>
      <i>{fileExt?.toUpperCase() || "N/A"}</i>
    </div>
  );
};

export default AttachmentCard;
