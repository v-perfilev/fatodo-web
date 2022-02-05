import React, {FC, MouseEvent, useMemo} from 'react';
import {IconButton} from '@material-ui/core';
import {groupsPreviewCardExpandButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../../components/icons/arrow-down-icon';
import {useGroupsPreviewListContext} from '../../../../shared/contexts/list-contexts/groups-preview-list-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import csx from 'classnames';

type Props = {};

const GroupsPreviewCardExpandButton: FC<Props> = ({}: Props) => {
  const classes = groupsPreviewCardExpandButtonStyles();
  const {group} = useGroupViewContext();
  const {expanded: previewExpanded, setExpanded} = useGroupsPreviewListContext();

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

export default GroupsPreviewCardExpandButton;
