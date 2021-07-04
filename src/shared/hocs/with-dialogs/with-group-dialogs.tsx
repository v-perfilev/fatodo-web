import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import {Group} from '../../../models/group.model';
import {
  defaultGroupDeleteDialogProps,
  GroupDeleteDialog,
  GroupDeleteDialogProps,
} from '../../../pages/group/dialogs/group-delete-dialog';
import {GroupDialogContext} from '../../contexts/dialog-contexts/group-dialog-context';

enum GroupDialogs {
  DELETE = 'GROUP_DELETE_DIALOG',
}

const withGroupDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showGroupDeleteDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.DELETE);
      const props = {group, show, close, onSuccess} as GroupDeleteDialogProps;
      setDialogProps(GroupDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps]
  );

  const initDialogs = (): void => {
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showGroupDeleteDialog,
  };

  return (
    <GroupDialogContext.Provider value={context}>
      <Component {...props} />
    </GroupDialogContext.Provider>
  );
};

export default withGroupDialogs;
