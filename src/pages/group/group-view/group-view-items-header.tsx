import * as React from 'react';
import {FC} from 'react';
import {Box, Switch} from '@material-ui/core';
import {groupViewItemsHeaderStyles} from './_styles';

type Props = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewItemsHeader: FC<Props> = ({showArchived, setShowArchived}: Props) => {
  const classes = groupViewItemsHeaderStyles();

  const toggleArchived = (): void => {
    setShowArchived(!showArchived);
  };

  return (
    <Box className={classes.box}>
      <Switch checked={showArchived} onChange={toggleArchived} color="primary" />
    </Box>
  );
};

export default GroupViewItemsHeader;
