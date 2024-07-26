import React from "react";

const NoChatRoomsAvailable = ({}) => {
  return (
    <div className='flex flex-col mt-16 items-center justify-center h-full  text-gray-800 px-4'>
      <h2 className='text-[22px] font-semibold mb-3'>No Chat Rooms Available</h2>
      <p className='text-center text-sm  mb-6'>
        It looks like you don't have any active chat rooms. Start a new
        conversation to begin chatting!
      </p>
    </div>
  );
};

export default NoChatRoomsAvailable;
