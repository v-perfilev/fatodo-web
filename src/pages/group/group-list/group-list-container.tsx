import * as React from 'react';
import {FC} from 'react';
import {Container} from '@material-ui/core';
import {groupListContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import GroupsPreviewCard from './group-list-card/group-list-card';
import ControlMenu from '../../../components/layouts/control-menu/control-menu';
import {PageDivider} from '../../../components/surfaces';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {ReorderIcon} from '../../../components/icons/reorder-icon';
import {GroupRouteUtils} from '../_router';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const GroupListContainer: FC = () => {
  const classes = groupListContainerStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const {groups} = useGroupListContext();

  const redirectToGroupCreate = (): void => history.push(GroupRouteUtils.getCreateUrl());
  const redirectToGroupsSorting = (): void => history.push(GroupRouteUtils.getSortingUrl());

  const menuElements = [
    {icon: <PlusIcon />, action: redirectToGroupCreate, text: t('group:tooltips.create')},
    {icon: <ReorderIcon />, action: redirectToGroupsSorting, text: t('group:tooltips.reorder')},
  ] as MenuElement[];

  return (
    <Container className={classes.container}>
      <ControlMenu menu={menuElements} />
      <PageDivider />
      {groups?.map((group) => (
        <GroupsPreviewCard group={group} key={group.id} />
      ))}
    </Container>
  );
};

export default GroupListContainer;
