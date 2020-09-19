import React, {FC, useEffect, useState} from 'react';
import GroupsSortingGridContainer from './groups-sorting-grid-container';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/group.model';
import GroupService from '../../../services/group.service';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupsSorting: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const [groups, setGroups] = useState<Group[]>([]);

  const saveOrderAndRedirectToGroupsRoot = (): void => {
    history.push(Routes.GROUPS);
  };
  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

  const loadGroups = (): void => {
    GroupService.getAll().then((response) => {
      setGroups(response.data);
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
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return groups && <GroupsSortingGridContainer groups={groups} />;
};

export default compose(connector)(GroupsSorting);
