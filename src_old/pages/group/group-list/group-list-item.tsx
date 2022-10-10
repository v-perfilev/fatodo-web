import * as React from 'react';
import {FC, HTMLAttributes, memo, useEffect, useMemo} from 'react';
import {flowRight} from 'lodash';
import {groupListItemStyles} from './_styles';
import {animated} from 'react-spring';
import GroupListCard from './group-list-card/group-list-card';
import csx from 'classnames';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useGroupListItemsContext} from '../../../shared/contexts/list-contexts/group-list-items-context';
import {Group} from '../../../models/group.model';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import withUserList from '../../../shared/hocs/with-list/with-user-list';

type Props = HTMLAttributes<HTMLElement> & {
  group: Group;
  sorting: boolean;
  bind: (...any) => void;
  setItemRef: (element: HTMLDivElement) => void;
};

const GroupListItem: FC<Props> = ({group, style, sorting, bind, setItemRef}: Props) => {
  const classes = groupListItemStyles();
  const {group: contextGroup, setGroup} = useGroupViewContext();
  const {collapsed: listCollapsed} = useGroupListItemsContext();

  const collapsed = useMemo<boolean>(() => {
    return group && listCollapsed.has(group.id) ? listCollapsed.get(group.id) : false;
  }, [group, listCollapsed]);

  useEffect(() => {
    setGroup(group);
  }, [group]);

  const classNames = csx({[classes.sortingBox]: sorting && collapsed});
  const styles = sorting && collapsed ? style : {};

  return contextGroup ? (
    <div className={classNames} style={styles} ref={setItemRef}>
      <GroupListCard sorting={sorting} bind={bind} />
    </div>
  ) : null;
};

export default flowRight([animated, withGroupView, withItemList, withUserList, memo])(GroupListItem);
