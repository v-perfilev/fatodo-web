import * as React from 'react';
import {FC, useState} from 'react';
import {Fade, IconButton, Menu, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardActions: FC<Props> = ({group}: Props) => {
  const classes = groupCardActionsStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
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
      <IconButton onClick={handleClick} className={classes.action}>
        <DotsVerticalIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={console.log}>
          Test
        </MenuItem>
      </Menu>
    </>
  );
};

export default GroupPreviewCardActions;
