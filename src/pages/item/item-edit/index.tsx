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
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {ItemRouteUtils} from '../_router';
import {GroupRouteUtils} from '../../group/_router';
import {CircularSpinner} from '../../../components/loaders';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withItemView from '../../../shared/hocs/with-view/with-item-view';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {flowRight} from 'lodash';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {PageSpacer} from '../../../components/surfaces';
import ControlMenu from '../../../components/layouts/control-menu';
import {Container, ThemeProvider} from '@material-ui/core';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useReminderListContext} from '../../../shared/contexts/list-contexts/reminder-list-context';
import NotificationService from '../../../services/notification.service';
import withReminderList from '../../../shared/hocs/with-list/with-reminder-list';

const ItemEdit: FC = () => {
  const {i18n, t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const history = useHistory();
  const {itemId} = useParams();
  const {setMenu} = useAdditionalMenuContext();
  const {handleUserIds} = useUserListContext();
  const {obj: item, setObj: setItem, setLoad: setLoadItem, loading: itemLoading} = useItemViewContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();
  const {objs: reminders, setObjs: setReminders, setLoad: setLoadReminders} = useReminderListContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(item.groupId));
  const redirectToItemView = (): void => history.push(ItemRouteUtils.getViewUrl(itemId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const menuElements = [
    {icon: <CheckIcon />, action: saveCallback, text: t('item:tooltips.save'), loading: isSaving},
    {icon: <CloseIcon />, action: redirectToItemView, text: t('item:tooltips.cancel'), color: 'secondary'},
  ] as MenuElement[];

  const theme = ThemeFactory.getTheme(group?.color);

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

  const loadReminders = (): void => {
    NotificationService.getAllByTargetId(itemId)
      .then((response) => {
        setReminders(response.data);
      })
      .catch((response) => {
        if (response.status !== 404) {
          handleResponse(response);
        }
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
    setLoadReminders(() => (): void => loadReminders());
  }, []);

  useEffect(() => {
    if (item) {
      setLoadGroup(() => (): void => loadGroup());
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      loadUsers();
    }
  }, [group]);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, isSaving, saveCallback]);

  return groupLoading || itemLoading ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <ItemForm
          group={group}
          item={item}
          reminders={reminders}
          header={t('item:headers.edit', {group: group.title})}
          setSaveCallback={setSaveCallback}
          request={request}
        />
        <PageSpacer />
        <ControlMenu menu={menuElements} disabled={isSaving} floatRight />
      </Container>
    </ThemeProvider>
  );
};

export default flowRight([withGroupView, withItemView, withReminderList])(ItemEdit);
