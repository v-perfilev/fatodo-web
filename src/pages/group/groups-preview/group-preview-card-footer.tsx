import * as React from 'react';
import {FC, useEffect, useMemo, useState} from 'react';
import {Box, Button, CardActions, Typography} from '@material-ui/core';
import {groupCardFooterStyles} from './_styles';
import {AvatarGroup, BoxWithIcon} from '../../../components/surfaces';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {ItemsIcon} from '../../../components/icons/items-icon';
import {ArrowUpIcon} from '../../../components/icons/arrow-up-icon';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';
import {User} from '../../../models/user.model';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  itemsCount: number;
};

const GroupPreviewCardFooter: FC<Props> = ({page, setPage, totalPages, itemsCount}: Props) => {
  const classes = groupCardFooterStyles();
  const {users} = useUserListContext();
  const {group} = useGroupViewContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  const isMultiPage = useMemo<boolean>(() => totalPages > 1, [totalPages]);

  useEffect(() => {
    updateUsersToShow();
  }, [users, group]);

  const onUpClick = (): void => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onDownClick = (): void => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const paginationElement = (
    <Box className={classes.control}>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onUpClick}
        disabled={page === 0}
      >
        <ArrowUpIcon />
      </Button>
      <Box className={classes.pageCount}>
        <Typography color="primary">
          {page + 1} / {totalPages}
        </Typography>
      </Box>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onDownClick}
        disabled={page === totalPages - 1}
      >
        <ArrowDownIcon />
      </Button>
    </Box>
  );

  return (
    <CardActions className={classes.footer}>
      <AvatarGroup users={usersToShow} withPopup shorten={isMultiPage} />
      {isMultiPage && paginationElement}
      <Box className={classes.badges}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{itemsCount || 0}</BoxWithIcon>
      </Box>
    </CardActions>
  );
};

export default GroupPreviewCardFooter;
