import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfirmationDialog} from '../confirmation-dialog';
import {Item} from '../../../../models/item.model';
import ItemService from '../../../../services/item.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';

type Props = {
  item: Item;
  setItem: (item: Item) => void;
  onSuccess?: () => void;
};

export const DeleteItemDialog: FC<Props> = ({item, setItem, onSuccess}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.delete(item?.id)
      .then(() => {
        handleCode('groups.deleted', 'info');
        setItem(null);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((response) => {
        handleResponse(response);
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
      title={t('items:modals.deleteTitle')}
      text={t('items:modals.deleteText', {title: item?.title})}
      loading={loading}
    />
  );
};
