import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import GroupService from '../../../services/group.service';
import GroupsSortingContainer from './groups-sorting-container';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupListContext} from '../../../shared/contexts/group-list-context';
import {compose} from 'recompose';
import withGroupList from '../../../shared/hoc/with-group-list';

const GroupsSorting: FC = () => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {groups, setGroups} = useGroupListContext();
  const [order, setOrder] = useState<MutableRefObject<number[]>>();

  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const loadGroups = (): void => {
    GroupService.getAll()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const saveOrder = (): void => {
    const orderedGroupIds = order.current.map((o) => groups[o].id);
    GroupService.setGroupOrder(orderedGroupIds)
      .then(() => {
        handleCode('groups.sorted', 'info');
        redirectToGroups();
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} action={saveOrder} color="primary" tooltip={t('groups:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, order, groups]);

  return groups && <GroupsSortingContainer setOrder={setOrder} />;
};

export default compose(withGroupList)(GroupsSorting);
