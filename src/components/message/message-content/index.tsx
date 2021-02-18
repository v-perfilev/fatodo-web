import React, {FC, ReactNode} from 'react';


const MessageContent: FC = () => {

  const renderNumbers = (): ReactNode => {
    const a = Array.from({length: 1000}, (_, i) => i);
    return (
      <>
        {a.map((value, index) => <div key={index}>{value}</div>)}
      </>
    );
  };

  return (
    <>
      {renderNumbers()}
    </>
  );
};

export default MessageContent;
