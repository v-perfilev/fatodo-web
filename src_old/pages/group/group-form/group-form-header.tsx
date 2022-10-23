import React, {FC} from 'react';
import {Typography} from '@material-ui/core';
import {PageHeader} from '../../../components/surfaces';

type Props = {
  title: string;
};

const GroupFormHeader: FC<Props> = ({title}: Props) => {
  return (
    <PageHeader>
      <Typography variant="h6">{title}</Typography>
    </PageHeader>
  );
};

export default GroupFormHeader;