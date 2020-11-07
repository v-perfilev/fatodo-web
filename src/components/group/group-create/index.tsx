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
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {GroupRouteUtils} from '../_router';

const GroupCreate: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (id: string): void => history.push(GroupRouteUtils.getViewUrl(id));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    setIsSaving(true);
    GroupService.create(formData)
      .then((response) => {
        handleCode('group.created', 'info');
        const id = response.data.id;
        redirectToGroupView(id);
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={saveCallback}
        color="primary"
        tooltip={t('group:tooltips.ok')}
        loading={isSaving}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('group:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, isSaving, saveCallback]);

  return <GroupForm header={t('group:headers.create')} setSaveCallback={setSaveCallback} request={request} />;
};

export default GroupCreate;
