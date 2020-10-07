import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import GroupPreviewGridContainer from './group-preview-grid-container';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {GroupRoutes} from '../_router';
import {ReorderIcon} from '../../common/icons/reorder-icon';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/group.model';
import {PlusIcon} from '../../common/icons/plus-icon';
import GroupService from '../../../services/group.service';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';

const GroupPreview: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const [groups, setGroups] = useState<Group[]>([]);

  const redirectToAddGroup = (): void => history.push(Routes.GROUPS + GroupRoutes.CREATE);
  const redirectToGroupsSorting = (): void => history.push(Routes.GROUPS + GroupRoutes.SORTING);

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
        icon={<PlusIcon />}
        action={redirectToAddGroup}
        color="primary"
        tooltip={t('groups:tooltips.create')}
      />
      <AdditionalMenuButton
        icon={<ReorderIcon />}
        action={redirectToGroupsSorting}
        color="secondary"
        tooltip={t('groups:tooltips.reorder')}
      />
    </>
  );

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return <GroupPreviewGridContainer groups={groups} />;
};

export default GroupPreview;
