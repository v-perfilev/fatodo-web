import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import GroupForm from '../group-form/group-form';
import {useHistory, useParams} from 'react-router-dom';
import {Routes} from '../../router';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {GroupRouteUtils} from '../_router';
import {CircularSpinner} from '../../../components/loaders';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import ItemService from '../../../services/item.service';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {PageSpacer} from '../../../components/surfaces';
import ControlMenu from '../../../components/layouts/control-menu/control-menu';
import {ThemeFactory} from '../../../shared/theme/theme';
import {Container, ThemeProvider} from '@material-ui/core';
import {CloseIcon} from '../../../components/icons/close-icon';
import {groupEditStyles} from './_styles';

const GroupEdit: FC = () => {
  const classes = groupEditStyles();
  const history = useHistory();
  const {groupId} = useParams();
  const {i18n, t} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const {group, load: loadGroup} = useGroupViewContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState<() => void>(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(groupId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    setIsSaving(true);
    ItemService.updateGroup(formData)
      .then(() => {
        handleCode('group.edited', 'info');
        redirectToGroupView();
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  const menuElements = [
    {icon: <PlusIcon />, action: saveCallback, text: t('group:tooltips.save'), loading: isSaving},
    {icon: <CloseIcon />, action: redirectToGroupView, text: t('group:tooltips.cancel'), color: 'secondary'},
  ] as MenuElement[];

  const theme = ThemeFactory.getTheme(group?.color);

  useEffect(() => {
    loadGroup(groupId, redirectToNotFound, redirectToGroupView);
  }, []);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, isSaving, saveCallback]);

  return !group ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <GroupForm group={group} header={t('group:headers.edit')} setSaveCallback={setSaveCallback} request={request} />
        <PageSpacer />
        <ControlMenu menu={menuElements} disabled={isSaving} floatRight />
      </Container>
    </ThemeProvider>
  );
};

export default withGroupView(GroupEdit);
