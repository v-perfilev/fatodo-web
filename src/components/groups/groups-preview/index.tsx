import * as React from 'react';
import {FC, useEffect} from 'react';
import GroupPreviewGridContainer from './group-preview-grid-container';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ReorderIcon} from '../../common/icons/reorder-icon';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {PlusIcon} from '../../common/icons/plus-icon';
import GroupService from '../../../services/group.service';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {compose} from 'recompose';
import withGroupList from '../../../shared/hoc/with-group-list';
import {useGroupListContext} from '../../../shared/contexts/group-list-context';

const GroupPreview: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {setGroups, setLoadGroups} = useGroupListContext();

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const redirectToGroupsSorting = (): void => history.push(GroupRouteUtils.getSortingUrl());

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
        action={redirectToGroupCreate}
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
    setLoadGroups(() => (): void => loadGroups());
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return <GroupPreviewGridContainer />;
};

export default compose(withGroupList)(GroupPreview);
