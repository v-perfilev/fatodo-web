import * as React from 'react';
import {FC, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {Group} from '../../../models/group.model';
import PopupMenu from '../../common/inputs/popup-menu';

type Props = {
  group: Group;
};

const GroupPreviewCardActions: FC<Props> = ({group}: Props) => {
  const classes = groupCardActionsStyles();
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

  return (
    <>
      <IconButton onClick={handleClickOnAction} className={classes.action}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={anchorEl} isOpen={isOpen} onClose={handleClose}>
        <MenuItem onClick={console.log}>
          Test
        </MenuItem>
      </PopupMenu>
    </>
  );
};

export default GroupPreviewCardActions;
