import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Routes} from '../../router';
import {CheckIcon} from '../../../components/icons/check-icon';
import {CloseIcon} from '../../../components/icons/close-icon';
import {useHistory, useParams} from 'react-router-dom';
import ItemService from '../../../services/item.service';
import ItemForm from '../item-form';
import {ItemDTO} from '../../../models/dto/item.dto';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {GroupRouteUtils} from '../../group/_router';
import {CircularSpinner} from '../../../components/loaders';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {PageSpacer} from '../../../components/surfaces';
import ControlMenu from '../../../components/layouts/control-menu';
import {Container, ThemeProvider} from '@material-ui/core';
import {ThemeFactory} from '../../../shared/theme/theme';
import {itemCreateStyles} from './_styles';

const ItemCreate: FC = () => {
  const classes = itemCreateStyles();
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId} = useParams();
  const {setMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoad} = useGroupViewContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(groupId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const menuElements = [
    {icon: <CheckIcon />, action: saveCallback, text: t('item:tooltips.save'), loading: isSaving},
    {icon: <CloseIcon />, action: redirectToGroupView, text: t('item:tooltips.cancel'), color: 'secondary'},
  ] as MenuElement[];

  const theme = ThemeFactory.getTheme(group?.color);

  const loadGroup = (): void => {
    ItemService.getGroup(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
        redirectToGroupView();
      });
  };

  const request = (data: ItemDTO, stopSubmitting: () => void): void => {
    setIsSaving(true);
    ItemService.createItem(data)
      .then(() => {
        handleCode('item.created', 'info');
        redirectToGroupView();
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  useEffect(() => {
    setLoadGroup(() => (): void => loadGroup());
  }, []);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, isSaving, saveCallback]);

  return groupLoad ? (
    <CircularSpinner />
  ) : (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <ItemForm
          group={group}
          header={t('item:headers.create', {group: group.title})}
          setSaveCallback={setSaveCallback}
          request={request}
        />
        <PageSpacer />
        <ControlMenu menu={menuElements} disabled={isSaving} floatRight />
      </Container>
    </ThemeProvider>
  );
};

export default withGroupView(ItemCreate);
