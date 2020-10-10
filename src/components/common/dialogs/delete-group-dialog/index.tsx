import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfirmationDialog} from '../confirmation-dialog';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Group} from '../../../../models/group.model';
import GroupService from '../../../../services/group.service';

type Props = {
  group: Group;
  setGroup: (group: Group) => void;
  onSuccess?: () => void;
};

export const DeleteGroupDialog: FC<Props> = ({group, setGroup, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    GroupService.delete(group?.id)
      .then(() => {
        handleCode('groups.deleted', 'info');
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
      title={t('groups:modals.deleteTitle')}
      text={t('groups:modals.deleteText', {title: group?.title})}
      loading={loading}
    />
  );
};
