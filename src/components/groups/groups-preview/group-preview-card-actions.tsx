import * as React from 'react';
import {FC, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {Group} from '../../../models/group.model';
import {PopupMenu} from '../../common/layouts/popup-menu';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {GroupRoutes} from '../_router';
import {ItemRoutes} from '../../item/_router';

type Props = {
  group: Group;
};

const GroupPreviewCardActions: FC<Props> = ({group}: Props) => {
  const classes = groupCardActionsStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  const redirectToGroupView = (e: React.MouseEvent<HTMLElement>): void => {
    history.push((Routes.GROUPS + GroupRoutes.VIEW).replace(':groupId', group.id));
    handleClose(e);
  };

  const redirectToGroupEdit = (e: React.MouseEvent<HTMLElement>): void => {
    history.push((Routes.GROUPS + GroupRoutes.EDIT).replace(':groupId', group.id));
    handleClose(e);
  };

  const redirectToItemCreate = (e: React.MouseEvent<HTMLElement>): void => {
    history.push((Routes.ITEMS + ItemRoutes.CREATE).replace(':groupId', group.id));
    handleClose(e);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} className={classes.action}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={anchorEl} isOpen={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectToGroupView}>View</MenuItem>
        <MenuItem onClick={redirectToGroupEdit}>Edit</MenuItem>
        <MenuItem onClick={redirectToItemCreate}>Create item</MenuItem>
      </PopupMenu>
    </>
  );
};

export default GroupPreviewCardActions;
