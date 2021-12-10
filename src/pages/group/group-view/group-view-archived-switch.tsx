import * as React from 'react';
import {FC} from 'react';
import {Box, Switch} from '@material-ui/core';
import {groupViewArchivedSwitchStyles} from './_styles';
import {useTranslation} from 'react-i18next';

type Props = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewArchivedSwitch: FC<Props> = ({showArchived, setShowArchived}: Props) => {
  const classes = groupViewArchivedSwitchStyles();
  const {t} = useTranslation();

  const toggleArchived = (): void => {
    setShowArchived(!showArchived);
  };

  return (
    <Box className={classes.box}>
      <Box className={classes.label}>{t('group:tooltips.showArchived')}</Box>
      <Switch checked={showArchived} onChange={toggleArchived} color="primary" />
    </Box>
  );
};

export default GroupViewArchivedSwitch;
