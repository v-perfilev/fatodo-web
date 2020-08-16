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
import PageHeader from '../../common/page-layouts/page-header';
import {Group} from '../../../models/group';
import {TEST_GROUP} from '../../_constants';
import PageDivider from '../../common/page-layouts/page-divider';

const initGroup = TEST_GROUP;

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupView: FC<Props> = ({setMenu}: Props) => {
  const classes = groupStyles();
  const {i18n} = useTranslation();
  const [group, setGroup] = useState<Group>(null);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    setGroup(initGroup);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return group && (
    <Container className={classes.root}>
      <PageHeader title={group.title} />
      <PageDivider color={group.color} height={5} />
      <GroupViewUsers users={group.users} />
      <GroupViewItems items={group.items} color={group.color} />
      <GroupViewMessages group={group} />
    </Container>
  );
};

export default compose(connector, memo)(GroupView);
