import React, {FC, MouseEvent} from 'react';
import {IconButton} from '@material-ui/core';
import {groupListCardSortButtonStyles} from './_styles';
import {ArrowAllIcon} from '../../../../components/icons/arrow-all-icon';

type Props = {
  bind: (...any) => void;
};

const GroupListCardCreateButton: FC<Props> = ({bind}: Props) => {
  const classes = groupListCardSortButtonStyles();

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <IconButton onClick={handleClick} className={classes.root} {...bind}>
      <ArrowAllIcon />
    </IconButton>
  );
};

export default GroupListCardCreateButton;
