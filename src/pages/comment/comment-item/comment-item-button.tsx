import React, {FC, useCallback, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {commentItemButtonStyles} from './_styles';
import csx from 'classnames';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '../../../components/controls';
import {RefreshIcon} from '../../../components/icons/refresh-icon';

type Props = {
  loadMoreItems: () => Promise<void>;
  loadMoreChildren: (parentId: string) => Promise<void>;
  parentId?: string;
};

const CommentItemButton: FC<Props> = ({loadMoreItems, loadMoreChildren, parentId}: Props) => {
  const classes = commentItemButtonStyles();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const isChild = useMemo((): boolean => {
    return !!parentId;
  }, [parentId]);

  const loadMore = useCallback((): void => {
    const loadMoreFunc = (): Promise<void> => (isChild ? loadMoreChildren(parentId) : loadMoreItems());
    setLoading(true);
    loadMoreFunc().finally(() => setLoading(false));
  }, [loadMoreItems, loadMoreChildren, parentId]);

  const classNames = csx(classes.root, {[classes.child]: isChild});

  return (
    <Box className={classNames}>
      <LoadingButton
        startIcon={<RefreshIcon />}
        onClick={loadMore}
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

export default CommentItemButton;
