import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import GroupForm from '../group-form';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';
import GroupService from '../../../services/group.service';
import {GroupDTO} from '../../../models/dto/group.dto';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {GroupRouteUtils} from '../_router';

const GroupCreate: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const [saveCallback, setSaveCallback] = useState<() => void>(() => (): void => {
    // important stub function
  });

  const submit = (): void => saveCallback();
  const redirectToGroupView = (id: string): void => history.push(GroupRouteUtils.getViewUrl(id));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} action={submit} color="primary" tooltip={t('groups:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: GroupDTO, stopSubmitting: () => void): void => {
    GroupService.create(data)
      .then((response) => {
        handleCode('groups.created', 'info');
        const id = response.data.id;
        redirectToGroupView(id);
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
      });
  };

  return <GroupForm header={t('groups:headers.create')} setSaveCallback={setSaveCallback} request={request} />;
};

export default GroupCreate;
