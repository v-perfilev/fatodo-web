import React, {Dispatch, SetStateAction} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useTranslation} from 'react-i18next';
import {Switch, SxProps, Typography} from '@mui/material';

type GroupViewArchivedTogglerProps = {
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewArchivedToggler = ({showArchived, setShowArchived}: GroupViewArchivedTogglerProps) => {
  const {t} = useTranslation();

  const switchArchived = (): void => setShowArchived((prevState) => !prevState);

  return (
    <FVStack spacing={0} justifyContent="center" alignItems="center">
      <Typography color="grey.400" fontSize={12}>
        {showArchived ? t('group:actions.archived') : t('group:actions.active')}
      </Typography>
      <Switch sx={switchStyles} size="small" checked={!showArchived} onChange={switchArchived} />
    </FVStack>
  );
};

const switchStyles: SxProps = {
  marginY: -0.5,
  // paddingTop: 0,
};

export default GroupViewArchivedToggler;
