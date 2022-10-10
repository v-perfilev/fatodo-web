import React, {FC, MouseEvent, useMemo} from 'react';
import {IconButton} from '@material-ui/core';
import {groupListCardExpandButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../../components/icons/ArrowDownIcon';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import csx from 'classnames';

type Props = {};

const GroupListCardExpandButton: FC<Props> = ({}: Props) => {
  const classes = groupListCardExpandButtonStyles();
  const {group} = useGroupViewContext();
  const {collapsed: previewCollapsed, setCollapsed} = useGroupListItemsContext();

  const collapsed = useMemo<boolean>(() => {
    return group && previewCollapsed.has(group.id) ? previewCollapsed.get(group.id) : false;
  }, [group, previewCollapsed]);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed([group.id], !collapsed);
  };

  const classNames = csx(classes.root, {[classes.rotated]: !collapsed});

  return (
    <IconButton className={classNames} onClick={handleClick} size="small">
      <ArrowDownIcon />
    </IconButton>
  );
};

export default GroupListCardExpandButton;
