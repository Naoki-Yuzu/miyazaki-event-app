import React from 'react';
import Message from './message';

const DmContainer = () => {
  return (
    <div className="flex-1 py-5 px-2 gap-5 sm:gap-9 flex flex-col overflow-y-scroll">
      <Message isOwnerMessage/>
      <Message isOwnerMessage={false}/>
    </div>
  )
}

export default DmContainer