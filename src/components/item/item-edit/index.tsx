import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {Item} from '../../../models/item.model';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import ItemForm from '../item-form';
import {compose} from 'recompose';
import {useHistory, useParams} from 'react-router-dom';
import {Group} from '../../../models/group.model';
import {Routes} from '../../router';
import GroupService from '../../../services/group.service';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import ItemService from '../../../services/item.service';
import {NotificationUtils} from '../../../shared/utils/notification.utils';
import {enqueueSnackbar} from '../../../store/actions/notification.actions';

const mapDispatchToProps = {setMenu, enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemEdit: FC<Props> = ({setMenu, enqueueSnackbar}: Props) => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId, itemId} = useParams();
  const [saveCallback, setSaveCallback] = useState(() => () => {
  });
  const [group, setGroup] = useState<Group>(null);
  const [item, setItem] = useState<Item>(null);

  const submit = (): void => saveCallback();
  const redirectToItem = (): void => history.push(Routes.ITEMS + '/' + itemId);

  const loadGroupAndItem = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToItem();
      });
    ItemService.get(itemId)
      .then((response) => {
        setItem(response.data);
      })
      .catch(() => {
        redirectToItem();
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={submit}
        color="primary"
        tooltip={t('items:tooltips.ok')}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToItem}
        color="secondary"
        tooltip={t('items:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    loadGroupAndItem();
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: FormData, stopSubmitting: () => void) => {
    ItemService.update(data)
      .then(() => {
        NotificationUtils.handleSnack('items.created', 'info', enqueueSnackbar);
        redirectToItem();
      })
      .catch((response) => {
        NotificationUtils.handleFeedback(response, '*', '', enqueueSnackbar);
        stopSubmitting();
      });
  };

  return group && item && (
    <ItemForm
      group={group}
      item={item}
      header={t('items:headers.edit', {group: group.title})}
      setSaveCallback={setSaveCallback}
      request={request}
    />
  );
};

export default compose(connector)(ItemEdit);
