import React, {FC, memo, useEffect, useState} from 'react';
import {TEST_GROUP} from '../_constants';
import GroupsSortingGridContainer from './groups-sorting-grid-container';
import {CheckIcon} from '../../../shared/components/icons/check-icon';
import {CloseIcon} from '../../../shared/components/icons/close-icon';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {clearMenu, setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';

const initGroups = Array.from(Array(10).keys()).map(() => {
  return TEST_GROUP;
});

const mapDispatchToProps = {setMenu, clearMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupsSorting: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton icon={<CheckIcon />} color="primary" tooltip={t('groups:tooltips.ok')} />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroupsRoot}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return <GroupsSortingGridContainer groups={groups} />;
};

export default compose(connector, memo)(GroupsSorting);
