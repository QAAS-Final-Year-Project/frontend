import React from "react";

type Props = {};

const NoChatRoom = (props: Props) => {
  return (
    <div className='flex-1 flex flex-col  h-full items-center justify-center w-full bg-white text-gray-600'>
      {/* <MessageSquare size={64} className='mb-4 text-gray-400' /> */}
      <h2 className='text-2xl font-semibold mb-2'>No Chat Selected</h2>
      <p className='text-center max-w-md'>
        Select a chat from the sidebar or start a new conversation to begin
        messaging.
      </p>
    </div>
  );
};
export default NoChatRoom;
