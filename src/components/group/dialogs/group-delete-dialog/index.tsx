import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Group} from '../../../../models/group.model';
import GroupService from '../../../../services/group.service';
import ConfirmationDialog from '../../../common/dialogs/confirmation-dialog';

export type GroupDeleteDialogProps = {
  group: Group;
  close: () => void;
  onSuccess?: () => void;
}

export const defaultGroupDeleteDialogProps: Readonly<GroupDeleteDialogProps> = {
  group: null,
  close: (): void => {
  }
};

type Props = GroupDeleteDialogProps;

export const GroupDeleteDialog: FC<Props> = ({group, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    GroupService.delete(group?.id)
      .then(() => {
        handleCode('group.deleted', 'info');
        close();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDisagree = (): void => {
    close();
  };

  return (
    <ConfirmationDialog
      open={!!group}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('group:modals.deleteTitle')}
      text={t('group:modals.deleteText', {title: group?.title})}
      loading={loading}
    />
  );
};
