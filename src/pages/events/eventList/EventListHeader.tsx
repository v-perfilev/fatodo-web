import React from 'react';
import {IconButton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import CloseIcon from '../../../components/icons/CloseIcon';
import PageHeader from '../../../components/layouts/PageHeader';

type EventListHeaderProps = {
  toggleCollapsed?: () => void;
  width?: number;
};

const EventListHeader = ({toggleCollapsed, width}: EventListHeaderProps) => {
  const {t} = useTranslation();

  return (
    <PageHeader width={width} maxWidth="md" position="absolute" title={t('routes.EventList')}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CloseIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

export default EventListHeader;
