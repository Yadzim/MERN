import React, { useState, useEffect } from 'react';

const Chat: React.FC = (): JSX.Element => {

  return (
    <div className="p-4">
      {/* <h1>Chat</h1> */}
      <div className="e-card max-w-[1200px] m-auto p-4">
        <div className="chat-header py-2 px-4">
        <p>ID</p>
        </div>
        <ul className='min-h-[220px] text-start flex flex-col gap-1' >
          <li className='bg-element rounded-lg py-1 px-2' >sadsad</li>
          <li className='bg-element rounded-lg py-1 px-2' >sadsad</li>
          <li className='bg-element rounded-lg py-1 px-2' >sadsad</li>
        </ul>
        <div className="chat-footer flex-center gap-4">
          <input type="text" className="e-input h-8 w-[120px]" />
          <input type="text" className="e-input h-8 w-full" />
          <button className="e-btn py-1 px-4 h-8">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;