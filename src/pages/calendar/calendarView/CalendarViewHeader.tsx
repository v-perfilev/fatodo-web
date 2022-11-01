import React, {memo} from 'react';
import {useAppDispatch} from '../../../store/store';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import {IconButton} from '@mui/material';
import BellIcon from '../../../components/icons/BellIcon';

type GroupListHeaderProps = {
  toggleCollapsed?: () => void;
};

const CalendarViewHeader = ({toggleCollapsed}: GroupListHeaderProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (
    <PageHeader maxWidth="md" position="absolute" title={t('routes.Groups')}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <BellIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

export default memo(CalendarViewHeader);
