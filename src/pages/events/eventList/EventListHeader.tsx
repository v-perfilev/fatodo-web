import React from 'React';
import {IconButton, SxProps, Typography} from '@mui/material';
import {EVENTS_HEADER_HEIGHT} from '../../../constants';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/boxes/FHStack';
import CloseIcon from '../../../components/icons/CloseIcon';

type EventListHeaderProps = {
  toggleCollapsed?: () => void;
};

const EventListHeader = ({toggleCollapsed}: EventListHeaderProps) => {
  const {t} = useTranslation();

  return (
    <FHStack sx={containerStyles}>
      <FHStack spacing={1}>
        <Typography color="primary" fontWeight="bold" fontSize={14}>
          {t('routes.EventList')}
        </Typography>
      </FHStack>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CloseIcon />
        </IconButton>
      )}
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: EVENTS_HEADER_HEIGHT,
  paddingLeft: 2,
  paddingRight: 1,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.300',
};

export default EventListHeader;
