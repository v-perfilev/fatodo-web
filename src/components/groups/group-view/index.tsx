import React, {FC, memo, useEffect, useState} from 'react';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {Container, ThemeProvider} from '@material-ui/core';
import GroupViewItems from './group-view-items';
import GroupViewUsers from './group-view-users';
import GroupViewMessages from './group-view-messages';
import {groupStyles} from './_styles';
import {Group} from '../../../models/group.model';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {EditIcon} from '../../common/icons/edit-icon';
import {Routes} from '../../router';
import {GroupRoutes} from '../_router';
import {useHistory, useParams} from 'react-router-dom';
import {GroupsIcon} from '../../common/icons/groups-icon';
import GroupService from '../../../services/group.service';
import {PlusIcon} from '../../common/icons/plus-icon';
import {ItemRoutes} from '../../item/_router';
import {ThemeFactory} from '../../../shared/theme/theme';
import {PageHeader} from '../../common/layouts/page-header';
import {PageDivider} from '../../common/layouts/page-divider';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {PageSpacer} from '../../common/layouts/page-spacer';
import {DeleteIcon} from '../../common/icons/delete-icon';

const GroupView: FC = () => {
  const classes = groupStyles();
  const history = useHistory();
  const {groupId} = useParams();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const {t, i18n} = useTranslation();
  const [group, setGroup] = useState<Group>(null);

  const redirectToCreateItem = (): void =>
    history.push((Routes.ITEMS + ItemRoutes.CREATE).replace(':groupId', groupId));
  const redirectToEditGroup = (): void => history.push((Routes.GROUPS + GroupRoutes.EDIT).replace(':groupId', groupId));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
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
        tooltip={t('items:tooltips.create')}
      />
      <AdditionalMenuButton
        icon={<EditIcon />}
        action={redirectToEditGroup}
        color="primary"
        tooltip={t('groups:tooltips.edit')}
      />
      <AdditionalMenuButton
        icon={<DeleteIcon />}
        action={console.log}
        color="primary"
        tooltip={t('groups:tooltips.delete')}
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
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Container className={classes.root}>
          <PageHeader title={group.title} filename={group.imageFilename} />
          <PageDivider height={5} />
          <GroupViewUsers groupUsers={group.users} />
          <GroupViewItems groupId={group.id} />
          <PageSpacer />
          <GroupViewMessages group={group} />
        </Container>
      </ThemeProvider>
    )
  );
};

export default compose(memo)(GroupView);
