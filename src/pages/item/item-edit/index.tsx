import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form';
import {useHistory, useParams} from 'react-router-dom';
import {Routes} from '../../router';
import {CheckIcon} from '../../../components/icons/check-icon';
import {CloseIcon} from '../../../components/icons/close-icon';
import ItemService from '../../../services/item.service';
import {ItemDTO} from '../../../models/dto/item.dto';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-contexts/additional-menu-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {ItemRouteUtils} from '../_router';
import {GroupRouteUtils} from '../../group/_router';
import {CircularSpinner} from '../../../components/loaders';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withItemView from '../../../shared/hocs/with-view/with-item-view';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {flowRight} from 'lodash';

const ItemEdit: FC = () => {
  const {i18n, t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const history = useHistory();
  const {itemId} = useParams();
  const {setMenu} = useAdditionalMenuContext();
  const {obj: item, setObj: setItem, setLoad: setLoadItem, loading: itemLoading} = useItemViewContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(item.groupId));
  const redirectToItemView = (): void => history.push(ItemRouteUtils.getViewUrl(itemId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const additionalMenuItems = [
    {icon: <CheckIcon />, action: saveCallback, tooltip: t('item:tooltips.ok')},
    {icon: <CloseIcon />, action: redirectToItemView, tooltip: t('item:tooltips.cancel')},
  ];

  const loadItem = (): void => {
    ItemService.getItem(itemId)
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
    ItemService.getGroup(item?.groupId)
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
    ItemService.updateItem(data)
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
    setLoadItem(() => (): void => loadItem());
  }, []);

  useEffect(() => {
    if (item) {
      setLoadGroup(() => (): void => loadGroup());
    }
  }, [item]);

  useEffect(() => {
    setMenu(additionalMenuItems);
  }, [i18n.language, isSaving, saveCallback]);

  return groupLoading || itemLoading ? (
    <CircularSpinner />
  ) : (
    <ItemForm
      group={group}
      item={item}
      header={t('item:headers.edit', {group: group.title})}
      setSaveCallback={setSaveCallback}
      request={request}
    />
  );
};

export default flowRight([withGroupView, withItemView])(ItemEdit);
