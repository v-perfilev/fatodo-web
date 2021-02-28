import React, {FC, ReactNode} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';

const MessageControlList: FC = () => {
  const classes = messageControlListStyles();

  const renderNumbers = (): ReactNode => {
    const a = Array.from({length: 1000}, (_, i) => i);
    return (
      <>
        {a.map((value, index) => <div key={index}>{value}</div>)}
      </>
    );
  };

  return (
    <Box className={classes.root}>
      {renderNumbers()}
    </Box>
  );
};

export default MessageControlList;
