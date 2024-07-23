import Header from "Shared/components/layout/header";
import Avatar from "Shared/components/media/avatar";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

interface ChatBubbleProps {
  me?: boolean;
  message: string;
  avatarSrc: string;
}

const ChatBubble: FC<ChatBubbleProps> = ({ me, message, avatarSrc }) => {
  return (
    <div
      className={classNames(
        "w-full flex",
        me ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={classNames(
          "flex items-center gap-x-5 max",
          "max-w-[50%]",
          me ? "flex-row" : "flex-row-reverse"
        )}
      >
        <div
          className={classNames(
            "py-3 px-5 rounded relative",
            me ? "bg-primary-500" : "bg-zinc-100"
          )}
        >
        <p
            className={classNames(
              "text-[15px] font-normal  leading-[25px]",
              me ? "text-white" : "text-stone-500"
            )}
          >
            {message}
          </p>
          <div
            className={classNames(
              "w-0 h-0 absolute top-[40%] border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent",
              me
                ? "border-l-[12px] -right-[12px] border-l-primary-500"
                : "border-r-[12px] -left-[12px] border-r-zinc-100"
            )}
          />
        </div>
        <Avatar alt='Test' src={avatarSrc} />
      </div>
    </div>
  );
};

export default ChatBubble;
