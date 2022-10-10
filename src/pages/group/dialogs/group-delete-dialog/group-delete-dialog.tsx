import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Group} from '../../../../models/group.model';
import ConfirmationDialog from '../../../../components/dialogs/ConfirmationDialog';
import ItemService from '../../../../services/item.service';

export type GroupDeleteDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupDeleteDialogProps: Readonly<GroupDeleteDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

type Props = GroupDeleteDialogProps;

const GroupDeleteDialog: FC<Props> = ({group, show, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.deleteGroup(group?.id)
      .then(() => {
        handleCode('group.deleted', 'info');
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
      title={t('group:deleteGroup.title')}
      text={t('group:deleteGroup.text', {title: group?.title})}
      loading={loading}
    />
  );
};

export default GroupDeleteDialog;
