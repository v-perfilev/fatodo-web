import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import GroupsGridContainer from './groups-grid-container';
import {TEST_GROUP} from '../_constants';
import {compose} from 'recompose';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import {GroupsRoutes} from '../_router';
import {connect, ConnectedProps} from 'react-redux';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {ReorderIcon} from '../../../shared/components/icons/reorder-icon';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';

const initGroups = Array.from(Array(10).keys()).map(() => {
  return TEST_GROUP;
});

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupsPreview: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const [groups, setGroups] = useState([]);

  const redirectToGroupsSorting = (): void => history.push(Routes.GROUPS + GroupsRoutes.SORTING);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ReorderIcon />}
        action={redirectToGroupsSorting}
        color="primary"
        tooltip={t('groups:tooltips.reorder')}
      />
    </>
  );

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return <GroupsGridContainer groups={groups} />;
};

export default compose(connector)(GroupsPreview);
