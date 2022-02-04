import React, {FC, MouseEvent} from 'react';
import {IconButton} from '@material-ui/core';
import {groupsPreviewCardExpandButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';

type Props = {};

const GroupsPreviewCardExpandButton: FC<Props> = ({}: Props) => {
  const classes = groupsPreviewCardExpandButtonStyles();

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('!');
  };

  return (
    <IconButton onClick={handleClick} className={classes.root}>
      <ArrowDownIcon />
    </IconButton>
  );
};

export default GroupsPreviewCardExpandButton;
