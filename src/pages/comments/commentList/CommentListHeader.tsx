import React from 'React';
import {IconButton} from '@mui/material';
import {useTranslation} from 'react-i18next';
import CloseIcon from '../../../components/icons/CloseIcon';
import PageHeader from '../../../components/layouts/PageHeader';

type CommentListHeaderProps = {
  toggleCollapsed?: () => void;
};

const CommentListHeader = ({toggleCollapsed}: CommentListHeaderProps) => {
  const {t} = useTranslation();

  return (
    <PageHeader maxWidth="md" position="absolute" title={t('routes.CommentList')}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CloseIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

export default CommentListHeader;
