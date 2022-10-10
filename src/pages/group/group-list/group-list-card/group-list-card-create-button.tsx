import React, {FC, MouseEvent} from 'react';
import {IconButton} from '@material-ui/core';
import {groupListCardCreateButtonStyles} from './_styles';
import {PlusIcon} from '../../../../components/icons/PlusIcon';
import {ItemRouteUtils} from '../../../item/_router';
import {useHistory} from 'react-router-dom';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';

const GroupListCardCreateButton: FC = () => {
  const classes = groupListCardCreateButtonStyles();
  const history = useHistory();
  const {group} = useGroupViewContext();

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    history.push(ItemRouteUtils.getCreateUrl(group.id));
  };

  return (
    <IconButton className={classes.root} onClick={handleClick} size="small">
      <PlusIcon />
    </IconButton>
  );
};

export default GroupListCardCreateButton;
