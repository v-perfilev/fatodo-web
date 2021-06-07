import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import GroupsSortingContainer from './groups-sorting-container';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {CircularSpinner} from '../../common/loaders';
import ItemService from '../../../services/item.service';

const GroupsSorting: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {objs: groups, setObjs: setGroups, setLoad: setLoadGroups, loading: groupsLoading} = useGroupListContext();
  const [isSaving, setIsSaving] = useState(false);
  const [order, setOrder] = useState<MutableRefObject<number[]>>();

  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const loadGroups = (): void => {
    ItemService.getAllGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const saveOrder = (): void => {
    setIsSaving(true);
    const orderedGroupIds = order.current.map((o) => groups[o].id);
    ItemService.setGroupOrder(orderedGroupIds)
      .then(() => {
        handleCode('group.sorted', 'info');
        redirectToGroups();
      })
      .catch((response) => {
        handleResponse(response);
        setIsSaving(false);
      });
  };

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={saveOrder}
        color="primary"
        tooltip={t('group:tooltips.ok')}
        loading={isSaving}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('group:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    setLoadGroups(() => (): void => loadGroups());
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, isSaving, order, groups]);

  return groupsLoading ? <CircularSpinner /> : <GroupsSortingContainer setOrder={setOrder} />;
};

export default withGroupList(GroupsSorting);
