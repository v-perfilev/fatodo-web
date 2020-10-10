import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {Group} from '../../models/group.model';
import {GroupViewContext} from '../contexts/group-view-context';

const withGroupView = (Component: ComponentType): FC => (props): ReactElement => {
  const [group, setGroup] = useState<Group>(null);

  const context = {group, setGroup};

  return (
    <GroupViewContext.Provider value={context}>
      <Component {...props} />
    </GroupViewContext.Provider>
  );
};

export default withGroupView;
