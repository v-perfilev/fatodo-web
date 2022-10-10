import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Item} from '../../../../models/item.model';
import ItemService from '../../../../services/item.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ConfirmationDialog from '../../../../components/dialogs/ConfirmationDialog';

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

const ItemDeleteDialog: FC<Props> = ({item, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.deleteItem(item?.id)
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
      title={t('item:deleteItem.title')}
      text={t('item:deleteItem.text', {title: item?.title})}
      loading={loading}
    />
  );
};

export default ItemDeleteDialog;
