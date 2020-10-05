import React, {FC, useEffect, useState} from 'react';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/group.model';
import GroupService from '../../../services/group.service';
import GroupsSortingContainer from './groups-sorting-container';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';

const GroupsSorting: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const [groups, setGroups] = useState<Group[]>([]);

  const saveOrderAndRedirectToGroupsRoot = (): void => {
    history.push(Routes.GROUPS);
  };
  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

  const loadGroups = (): void => {
    GroupService.getAll()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={saveOrderAndRedirectToGroupsRoot}
        color="primary"
        tooltip={t('groups:tooltips.ok')}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroupsRoot}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    loadGroups();
    updateMenu(menu, true);
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return groups && <GroupsSortingContainer groups={groups} />;
};

export default GroupsSorting;
