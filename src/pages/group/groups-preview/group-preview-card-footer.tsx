import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Button, CardActions, Typography} from '@material-ui/core';
import {groupCardFooterStyles} from './_styles';
import {AvatarGroup, BoxWithIcon} from '../../../components/surfaces';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {ItemsIcon} from '../../../components/icons/items-icon';
import {ArrowUpIcon} from '../../../components/icons/arrow-up-icon';
import {BUTTONS_IN_GROUP_CARD, ITEMS_IN_GROUP_CARD} from '../_constants';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';
import {User} from '../../../models/user.model';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  onUpClick: () => void;
  onDownClick: () => void;
  isMultiPage: boolean;
  isNotFirstPage: boolean;
  isNotLastPage: boolean;
  firstShownItem: number;
};

const GroupPreviewCardFooter: FC<Props> = (props: Props) => {
  const classes = groupCardFooterStyles();
  const {onUpClick, onDownClick, isMultiPage, isNotFirstPage, isNotLastPage, firstShownItem} = props;
  const {users} = useUserListContext();
  const {objs: items} = useItemListContext();
  const {obj: group} = useGroupViewContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    updateUsersToShow();
  }, [users, group]);

  const pageNumber = Math.floor(firstShownItem / ITEMS_IN_GROUP_CARD) + 1;
  const totalPages = Math.ceil((items.length + BUTTONS_IN_GROUP_CARD) / ITEMS_IN_GROUP_CARD);

  const paginationElement = (
    <Box className={classes.control}>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onUpClick}
        disabled={!isNotFirstPage}
      >
        <ArrowUpIcon />
      </Button>
      <Box className={classes.pageCount}>
        <Typography color="primary">
          {pageNumber} / {totalPages}
        </Typography>
      </Box>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onDownClick}
        disabled={!isNotLastPage}
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
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{items?.length || 0}</BoxWithIcon>
      </Box>
    </CardActions>
  );
};

export default GroupPreviewCardFooter;
