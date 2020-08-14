import React, {FC, memo, useEffect, useState} from 'react';
import {TEST_GROUP} from '../_constants';
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
import GroupViewHeader from './group-view-header';

const initGroup = TEST_GROUP;

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupView: FC<Props> = ({setMenu}: Props) => {
  const classes = groupStyles();
  const {i18n} = useTranslation();
  const [group, setGroup] = useState(null);

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
      <GroupViewHeader group={group} />
      <GroupViewUsers users={group.users} />
      <GroupViewItems items={group.items} />
      <GroupViewMessages group={group} />
    </Container>
  );
};

export default compose(connector, memo)(GroupView);
