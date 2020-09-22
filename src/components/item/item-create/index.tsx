import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useHistory, useParams} from 'react-router-dom';
import GroupService from '../../../services/group.service';
import {Notification} from '../../../shared/notification/notification';
import ItemService from '../../../services/item.service';
import {Group} from '../../../models/group.model';
import ItemForm from '../item-form';
import {ItemDTO} from '../../../models/dto/item.dto';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ItemCreate: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId} = useParams();
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });
  const [group, setGroup] = useState<Group>(null);

  const submit = (): void => saveCallback();
  const redirectToItem = (id: string): void => history.push(Routes.ITEMS + '/' + id);
  const redirectToGroup = (): void => history.push(Routes.GROUPS + '/' + groupId);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToGroup();
      });
  };

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

  useEffect(() => {
    loadGroup();
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: ItemDTO, stopSubmitting: () => void): void => {
    ItemService.create(data)
      .then((response) => {
        Notification.handleSnack('items.created', 'info');
        const id = response.data.id;
        console.log(Routes.ITEMS + '/' + id);
        redirectToItem(id);
      })
      .catch((response) => {
        Notification.handleFeedback(response);
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

export default compose(connector)(ItemCreate);
