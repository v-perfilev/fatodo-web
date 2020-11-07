import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfirmationDialog} from '../confirmation-dialog';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Group} from '../../../../models/group.model';
import GroupService from '../../../../services/group.service';
import {DeleteDialogProps} from '../../../../shared/contexts/delete-contexts/types';

type Props = DeleteDialogProps<Group>;

export const GroupDeleteDialog: FC<Props> = ({obj: group, setObj: setGroup, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    GroupService.delete(group?.id)
      .then(() => {
        handleCode('group.deleted', 'info');
        setGroup(null);
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
    setGroup(null);
  };

  return (
    <ConfirmationDialog
      open={group !== null}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('group:modals.deleteTitle')}
      text={t('group:modals.deleteText', {title: group?.title})}
      loading={loading}
    />
  );
};
