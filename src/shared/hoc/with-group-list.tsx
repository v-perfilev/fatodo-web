import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Group} from '../../models/group.model';
import {GroupListProvider} from '../contexts/group-list-context';

const withGroupList = (Component: ComponentType): FC => (props): ReactElement => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadGroups, setLoadGroups] = useState(() => (): void => {
    // important stub function
  });

  const context = {groups, setGroups, loadGroups, setLoadGroups};

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return (
    <GroupListProvider value={context}>
      <Component {...props} />
    </GroupListProvider>
  );
};

export default withGroupList;
