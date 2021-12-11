import React, {FC} from 'react';
import {commentListLoadButtonStyles} from './_styles';
import {Box} from '@material-ui/core';
import {LoadingButton} from '../../../components/controls';
import {RefreshIcon} from '../../../components/icons/refresh-icon';
import {useTranslation} from 'react-i18next';

type Props = {
  loadMoreItems: () => Promise<void>;
  loading: boolean;
};

const CommentListLoadButton: FC<Props> = ({loadMoreItems, loading}: Props) => {
  const classes = commentListLoadButtonStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <LoadingButton
        startIcon={<RefreshIcon />}
        onClick={loadMoreItems}
        variant="outlined"
        size="small"
        loading={loading}
        disabled={loading}
      >
        {t('comment:list.loadMore')}
      </LoadingButton>
    </Box>
  );
};

export default CommentListLoadButton;
