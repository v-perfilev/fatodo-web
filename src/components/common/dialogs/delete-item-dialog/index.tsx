import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfirmationDialog} from '../confirmation-dialog';
import {Item} from '../../../../models/item.model';
import ItemService from '../../../../services/item.service';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../../../groups/_router';
import {useSnackContext} from '../../../../shared/contexts/snack-context';

type Props = {
  item: Item;
  setItem?: (item: Item) => void;
};

export const DeleteItemDialog: FC<Props> = ({item, setItem}: Props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.delete(item?.id)
      .then(() => {
        if (setItem) {
          setItem(null);
        } else {
          history.push(GroupRouteUtils.getViewUrl(item.id));
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
