import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {Group} from '../../../models/group.model';
import GroupForm from '../group-form';
import {useHistory, useParams} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import GroupService from '../../../services/group.service';
import {Notification} from '../../../shared/notification/notification';
import {GroupDTO} from '../../../models/dto/group.dto';
import {useAdditionalMenuContext} from '../../../shared/hoc/with-additional-menu';

const GroupEdit: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const {groupId} = useParams();
  const [saveCallback, setSaveCallback] = useState<() => void>(() => (): void => {
    // important stub function
  });
  const [group, setGroup] = useState<Group>(null);

  const submit = (): void => saveCallback();
  const redirectToGroup = (): void => history.push(Routes.GROUPS + '/' + groupId);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToNotFound();
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} action={submit} color="primary" tooltip={t('groups:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroup}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    loadGroup();
    updateMenu(menu, true);
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: GroupDTO, stopSubmitting: () => void): void => {
    GroupService.update(data)
      .then(() => {
        Notification.handleSnack('groups.edited', 'info');
        redirectToGroup();
      })
      .catch((response) => {
        Notification.handleFeedback(response);
        stopSubmitting();
      });
  };

  return (
    group && (
      <GroupForm group={group} header={t('groups:headers.edit')} setSaveCallback={setSaveCallback} request={request} />
    )
  );
};

export default GroupEdit;
