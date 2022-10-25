import React from 'react';
import {Typography} from '@mui/material';
import PageDivider from '../../../components/layouts/PageDivider';
import FVStack from '../../../components/boxes/FVStack';

type ChatViewDateProps = {
  date: string;
};

const ChatViewDate = ({date}: ChatViewDateProps) => {
  return (
    <FVStack spacing={1} paddingY={1} alignItems="center" justifyContent="center">
      <Typography color="primary" fontWeight="bold" fontSize={14}>
        {date}
      </Typography>
      <PageDivider color="secondary.main" />
    </FVStack>
  );
};

export default ChatViewDate;
