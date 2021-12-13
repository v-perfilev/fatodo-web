import React, {FC, memo} from 'react';
import {Theme, useMediaQuery} from '@material-ui/core';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {TooltipIconButtonProps} from '../../../components/surfaces';
import GroupsPreviewCardItemButtonsBig from './groups-preview-card-item-buttons-big';
import GroupsPreviewCardItemButtonsSmall from './groups-preview-card-item-buttons-small';
import {PopupMenuItemProps} from '../../../components/surfaces/popup-menu/popup-menu-item';

type Props = {
  item: Item;
};

const GroupsPreviewCardItemButtons: FC<Props> = ({item}: Props) => {
  const history = useHistory();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {t} = useTranslation();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);

  const clickOnViewButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    redirectToViewItem();
  };

  const menuItems = [
    {action: clickOnViewButton, icon: <EyeIcon color="primary" />, text: t('group:tooltips.view')},
  ] as PopupMenuItemProps[] & TooltipIconButtonProps[];

  return isBigDevice ? (
    <GroupsPreviewCardItemButtonsBig menuItems={menuItems} />
  ) : (
    <GroupsPreviewCardItemButtonsSmall menuItems={menuItems} />
  );
};

export default memo(GroupsPreviewCardItemButtons);
