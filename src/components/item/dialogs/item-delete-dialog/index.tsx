import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Item} from '../../../../models/item.model';
import ItemService from '../../../../services/item.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {DeleteDialogProps} from '../../../../shared/contexts/delete-contexts/types';
import ConfirmationDialog from '../../../common/dialogs/confirmation-dialog';

type Props = DeleteDialogProps<Item>;

export const ItemDeleteDialog: FC<Props> = ({obj: item, setObj: setItem, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.delete(item?.id)
      .then(() => {
        handleCode('item.deleted', 'info');
        setItem(null);
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
    setItem(null);
  };

  return (
    <ConfirmationDialog
      open={item !== null}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('item:modals.deleteTitle')}
      text={t('item:modals.deleteText', {title: item?.title})}
      loading={loading}
    />
  );
};
