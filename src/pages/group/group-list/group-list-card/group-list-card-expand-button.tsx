import React, {FC, MouseEvent, useMemo} from 'react';
import {IconButton} from '@material-ui/core';
import {groupListCardExpandButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../../components/icons/arrow-down-icon';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import csx from 'classnames';

type Props = {};

const GroupListCardExpandButton: FC<Props> = ({}: Props) => {
  const classes = groupListCardExpandButtonStyles();
  const {group} = useGroupViewContext();
  const {expanded: previewExpanded, setExpanded} = useGroupListItemsContext();

  const expanded = useMemo<boolean>(() => {
    return group && previewExpanded.has(group.id) ? previewExpanded.get(group.id) : true;
  }, [group, previewExpanded]);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded([group.id], !expanded);
  };

  const classNames = csx(classes.root, {[classes.rotated]: expanded});

  return (
    <IconButton onClick={handleClick} className={classNames}>
      <ArrowDownIcon />
    </IconButton>
  );
};

export default GroupListCardExpandButton;
