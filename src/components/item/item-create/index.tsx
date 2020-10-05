import React, {FC, useEffect, useState} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useHistory, useParams} from 'react-router-dom';
import GroupService from '../../../services/group.service';
import ItemService from '../../../services/item.service';
import {Group} from '../../../models/group.model';
import ItemForm from '../item-form';
import {ItemDTO} from '../../../models/dto/item.dto';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';

const ItemCreate: FC = () => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId} = useParams();
  const {updateMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });
  const [group, setGroup] = useState<Group>(null);

  const submit = (): void => saveCallback();
  const redirectToItem = (id: string): void => history.push(Routes.ITEMS + '/' + id);
  const redirectToGroup = (): void => history.push(Routes.GROUPS + '/' + groupId);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} action={submit} color="primary" tooltip={t('items:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroup}
        color="secondary"
        tooltip={t('items:tooltips.cancel')}
      />
    </>
  );

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
        redirectToGroup();
      });
  };

  useEffect(() => {
    loadGroup();
    updateMenu(menu, true);
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.create(data)
      .then((response) => {
        handleCode('items.created', 'info');
        const id = response.data.id;
        redirectToItem(id);
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
      });
  };

  return (
    group && (
      <ItemForm
        group={group}
        header={t('items:headers.create', {group: group.title})}
        setSaveCallback={setSaveCallback}
        request={request}
      />
    )
  );
};

export default ItemCreate;
