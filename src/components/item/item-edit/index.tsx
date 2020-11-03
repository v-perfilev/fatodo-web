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
import {ItemDTO} from '../../../models/dto/item.dto';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {ItemRouteUtils} from '../_router';
import {GroupRouteUtils} from '../../group/_router';
import {CircularSpinner} from '../../common/loaders/circular-spinner';

const ItemEdit: FC = () => {
  const {i18n, t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const history = useHistory();
  const {itemId} = useParams();
  const {updateMenu} = useAdditionalMenuContext();
  const [group, setGroup] = useState<Group>(null);
  const [item, setItem] = useState<Item>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(item.groupId));
  const redirectToItemView = (): void => history.push(ItemRouteUtils.getViewUrl(itemId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={saveCallback}
        color="primary"
        tooltip={t('item:tooltips.ok')}
        loading={isSaving}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToItemView}
        color="secondary"
        tooltip={t('item:tooltips.cancel')}
      />
    </>
  );

  const loadItem = (): void => {
    ItemService.get(itemId)
      .then((response) => {
        setItem(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
      });
  };

  const loadGroup = (): void => {
    GroupService.get(item?.groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
      });
  };

  const request = (data: ItemDTO, stopSubmitting: () => void): void => {
    setIsSaving(true);
    ItemService.update(data)
      .then(() => {
        handleCode('item.edited', 'info');
        redirectToGroupView();
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  useEffect(() => {
    loadItem();
  }, []);

  useEffect(() => {
    if (item) {
      loadGroup();
    }
  }, [item]);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, isSaving, saveCallback]);

  return group && item ? (
    <ItemForm
      group={group}
      item={item}
      header={t('item:headers.edit', {group: group.title})}
      setSaveCallback={setSaveCallback}
      request={request}
    />
  ) : (
    <CircularSpinner />
  );
};

export default ItemEdit;
