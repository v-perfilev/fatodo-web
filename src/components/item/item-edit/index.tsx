import React, {FC, useEffect, useState} from 'react';
import {Item} from '../../../models/item.model';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form';
import {useHistory, useParams} from 'react-router-dom';
import {Group} from '../../../models/group.model';
import {Routes} from '../../router';
import GroupService from '../../../services/group.service';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import ItemService from '../../../services/item.service';
import {Notification} from '../../../shared/notification/notification';
import {ItemDTO} from '../../../models/dto/item.dto';
import {useAdditionalMenuContext} from '../../../shared/hoc/with-additional-menu';

const ItemEdit: FC = () => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId, itemId} = useParams();
  const {updateMenu} = useAdditionalMenuContext();
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });
  const [group, setGroup] = useState<Group>(null);
  const [item, setItem] = useState<Item>(null);

  const submit = (): void => saveCallback();
  const redirectToItem = (): void => history.push(Routes.ITEMS + '/' + itemId);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} action={submit} color="primary" tooltip={t('items:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToItem}
        color="secondary"
        tooltip={t('items:tooltips.cancel')}
      />
    </>
  );

  const loadGroupAndItem = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToNotFound();
      });
    ItemService.get(itemId)
      .then((response) => {
        setItem(response.data);
      })
      .catch(() => {
        redirectToNotFound();
      });
  };

  const request = (data: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.update(data)
      .then(() => {
        Notification.handleSnack('items.edited', 'info');
        redirectToItem();
      })
      .catch((response) => {
        Notification.handleFeedback(response);
        stopSubmitting();
      });
  };

  useEffect(() => {
    loadGroupAndItem();
    updateMenu(menu, true);
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, saveCallback]);

  return (
    group &&
    item && (
      <ItemForm
        group={group}
        item={item}
        header={t('items:headers.edit', {group: group.title})}
        setSaveCallback={setSaveCallback}
        request={request}
      />
    )
  );
};

export default ItemEdit;
