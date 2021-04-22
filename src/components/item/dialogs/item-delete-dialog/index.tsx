import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Item} from '../../../../models/item.model';
import ItemService from '../../../../services/item.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ConfirmationDialog from '../../../common/dialogs/confirmation-dialog';

export type ItemDeleteDialogProps = {
  item: Item;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultItemDeleteDialogProps: Readonly<ItemDeleteDialogProps> = {
  item: null,
  show: false,
  close: (): void => undefined,
};

type Props = ItemDeleteDialogProps;

export const ItemDeleteDialog: FC<Props> = ({item, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.delete(item?.id)
      .then(() => {
        handleCode('item.deleted', 'info');
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
      open={!!item}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('item:modals.deleteTitle')}
      text={t('item:modals.deleteText', {title: item?.title})}
      loading={loading}
    />
  );
};
