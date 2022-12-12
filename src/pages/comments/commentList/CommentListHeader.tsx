import React from 'react';
import {IconButton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import CloseIcon from '../../../components/icons/CloseIcon';
import PageHeader from '../../../components/layouts/PageHeader';

type CommentListHeaderProps = {
  toggleCollapsed?: () => void;
  width?: number;
};

const CommentListHeader = ({toggleCollapsed, width}: CommentListHeaderProps) => {
  const {t} = useTranslation();

  return (
    <PageHeader width={width} maxWidth="md" position="absolute" title={t('routes.CommentList')}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CloseIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

export default CommentListHeader;
