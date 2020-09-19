import React, {FC, memo, useEffect, useState} from 'react';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import GroupViewItems from './group-view-items';
import GroupViewUsers from './group-view-users';
import GroupViewMessages from './group-view-messages';
import {groupStyles} from './_styles';
import PageHeader from '../../common/layout-page/page-header';
import {Group} from '../../../models/group.model';
import {TEST_GROUP} from '../../_constants';
import PageDivider from '../../common/layout-page/page-divider';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {EditIcon} from '../../common/icons/edit-icon';
import {Routes} from '../../router';
import {GroupRoutes} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../common/icons/groups-icon';
import GroupService from '../../../services/group.service';
import {PlusIcon} from '../../common/icons/plus-icon';
import {ItemRoutes} from '../../item/_router';

const initGroup = TEST_GROUP;

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupView: FC<Props> = ({setMenu}: Props) => {
  const classes = groupStyles();
  const history = useHistory();
  const {groupId} = useParams();
  const {t, i18n} = useTranslation();
  const [group, setGroup] = useState<Group>(null);

  const redirectToCreateItem = (): void =>
    history.push((Routes.ITEMS + ItemRoutes.CREATE).replace(':groupId', groupId));
  const redirectToEditGroup = (): void =>
    history.push((Routes.GROUPS + GroupRoutes.EDIT).replace(':groupId', groupId));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToGroups();
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={redirectToCreateItem}
        color="primary"
        tooltip={t('groups:tooltips.createItem')}
      />
      <AdditionalMenuButton
        icon={<EditIcon />}
        action={redirectToEditGroup}
        color="primary"
        tooltip={t('groups:tooltips.edit')}
      />
      <AdditionalMenuButton
        icon={<GroupsIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('groups:tooltips.list')}
      />
    </>
  );

  useEffect(() => {
    loadGroup();
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return (
    group && (
      <Container className={classes.root}>
        <PageHeader title={group.title} color={group.color} />
        <PageDivider color={group.color} height={5} />
        <GroupViewUsers users={group.users} />
        <GroupViewItems items={group.items ?? []} color={group.color} />
        <GroupViewMessages group={group} />
      </Container>
    )
  );
};

export default compose(connector, memo)(GroupView);
