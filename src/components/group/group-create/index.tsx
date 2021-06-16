import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import GroupForm from '../group-form';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {GroupRouteUtils} from '../_router';
import ItemService from '../../../services/item.service';

const GroupCreate: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (id: string): void => history.push(GroupRouteUtils.getViewUrl(id));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    setIsSaving(true);
    ItemService.createGroup(formData)
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

  const additionalMenuItems = [
    {icon: <CheckIcon />, action: saveCallback, tooltip: t('group:tooltips.ok')},
    {icon: <CloseIcon />, action: redirectToGroups, tooltip: t('group:tooltips.cancel')},
  ];

  useEffect(() => {
    setMenu(additionalMenuItems);
  }, [i18n.language, isSaving, saveCallback]);

  return <GroupForm header={t('group:headers.create')} setSaveCallback={setSaveCallback} request={request} />;
};

export default GroupCreate;
