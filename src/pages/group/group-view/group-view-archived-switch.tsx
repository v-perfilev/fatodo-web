import * as React from 'react';
import {FC} from 'react';
import {Box, Switch} from '@material-ui/core';
import {groupViewArchivedSwitchStyles} from './_styles';

type Props = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewArchivedSwitch: FC<Props> = ({showArchived, setShowArchived}: Props) => {
  const classes = groupViewArchivedSwitchStyles();

  const toggleArchived = (): void => {
    setShowArchived(!showArchived);
  };

  return (
    <Box className={classes.box}>
      <Switch checked={showArchived} onChange={toggleArchived} color="primary" />
    </Box>
  );
};

export default GroupViewArchivedSwitch;
