import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import {CheckIcon} from '../../../components/icons/check-icon';
import {CloseIcon} from '../../../components/icons/close-icon';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {useTranslation} from 'react-i18next';
import GroupsSortingContainer from './groups-sorting-grid-container';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import withGroupList from '../../../shared/hocs/with-list/with-group-list';
import {CircularSpinner} from '../../../components/loaders';
import ItemService from '../../../services/item.service';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';

const GroupsSorting: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {setMenu} = useAdditionalMenuContext();
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const [isSaving, setIsSaving] = useState(false);
  const [order, setOrder] = useState<MutableRefObject<number[]>>();

  const redirectToGroups = (): void => history.push(Routes.GROUPS);

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

  const menuElements = [
    {icon: <CheckIcon />, action: saveOrder, text: t('group:tooltips.save')},
    {icon: <CloseIcon />, action: redirectToGroups, text: t('group:tooltips.cancel')},
  ] as MenuElement[];

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, isSaving, order, groups]);

  return groupsLoading ? <CircularSpinner /> : <GroupsSortingContainer setOrder={setOrder} />;
};

export default withGroupList(GroupsSorting);
