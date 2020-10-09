import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {GroupDeleteProvider} from '../contexts/group-delete-context';
import {DeleteGroupDialog} from '../../components/common/dialogs/delete-group-dialog';
import {Group} from '../../models/group.model';

const withGroupDeleteDialog = (Component: ComponentType): FC => (props): ReactElement => {
  const [groupToDelete, setGroupToDelete] = useState<Group>(null);
  const [onDeleteGroupSuccess, setOnDeleteGroupSuccess] = useState(() => (): void => {
    // important stub function
  });

  const context = {setGroupToDelete, setOnDeleteGroupSuccess};

  return (
    <GroupDeleteProvider value={context}>
      <DeleteGroupDialog group={groupToDelete} setGroup={setGroupToDelete} onSuccess={onDeleteGroupSuccess} />
      <Component {...props} />
    </GroupDeleteProvider>
  );
};

export default withGroupDeleteDialog;
