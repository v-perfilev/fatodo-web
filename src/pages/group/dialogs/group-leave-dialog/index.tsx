import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Group} from '../../../../models/group.model';
import ConfirmationDialog from '../../../../components/dialogs/confirmation-dialog/confirmation-dialog';
import ItemService from '../../../../services/item.service';

export type GroupLeaveDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupLeaveDialogProps: Readonly<GroupLeaveDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

type Props = GroupLeaveDialogProps;

const GroupLeaveDialog: FC<Props> = ({group, show, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.leaveGroup(group?.id)
      .then(() => {
        handleCode('group.left', 'info');
        close();
        onSuccess();
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
      open={show}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('group:leaveGroup.title')}
      text={t('group:leaveGroup.text', {title: group?.title})}
      loading={loading}
    />
  );
};

export default GroupLeaveDialog;
