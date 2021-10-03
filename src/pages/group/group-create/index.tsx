import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import GroupForm from '../group-form';
import {CheckIcon} from '../../../components/icons/check-icon';
import {CloseIcon} from '../../../components/icons/close-icon';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {GroupRouteUtils} from '../_router';
import ItemService from '../../../services/item.service';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {PageSpacer} from '../../../components/surfaces';
import ControlMenu from '../../../components/layouts/control-menu';
import {ThemeFactory} from '../../../shared/theme/theme';
import {Container, ThemeProvider} from '@material-ui/core';

const GroupCreate: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (id: string): void => history.push(GroupRouteUtils.getViewUrl(id));
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    setIsSaving(true);
    ItemService.createGroup(formData)
      .then((response) => {
        handleCode('group.created', 'info');
        const id = response.data.id;
        redirectToGroupView(id);
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  const menuElements = [
    {icon: <CheckIcon />, action: saveCallback, text: t('group:tooltips.save'), loading: isSaving},
    {icon: <CloseIcon />, action: redirectToGroups, text: t('group:tooltips.cancel'), color: 'secondary'},
  ] as MenuElement[];

  const theme = ThemeFactory.getDefaultTheme();

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, isSaving, saveCallback]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GroupForm header={t('group:headers.create')} setSaveCallback={setSaveCallback} request={request} />
        <PageSpacer />
        <ControlMenu menu={menuElements} disabled={isSaving} />
      </Container>
    </ThemeProvider>
  );
};

export default GroupCreate;
