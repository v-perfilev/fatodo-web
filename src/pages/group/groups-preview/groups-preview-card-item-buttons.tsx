import React, {FC, useCallback, useRef, useState} from 'react';
import {IconButton, MenuItem, Theme, Tooltip, useMediaQuery} from '@material-ui/core';
import {groupsPreviewCardItemButtonsStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenu} from '../../../components/surfaces';

type Props = {
  item: Item;
};

const GroupsPreviewCardItemButtons: FC<Props> = ({item}: Props) => {
  const classes = groupsPreviewCardItemButtonsStyles();
  const history = useHistory();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);

  const handleClickOnAction = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const clickOnViewButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    redirectToViewItem();
  };

  const bigDeviceView = (
    <Tooltip title={t('group:tooltips.view')}>
      <IconButton size="small" className={classes.showIcon} onClick={clickOnViewButton}>
        <EyeIcon />
      </IconButton>
    </Tooltip>
  );

  const smallDeviceView = (
    <>
      <IconButton onClick={handleClickOnAction} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={clickOnViewButton}>
          <EyeIcon color="primary" />
          {t('group:tooltips.view')}
        </MenuItem>
      </PopupMenu>
    </>
  );

  return isBigDevice ? bigDeviceView : smallDeviceView;
};

export default GroupsPreviewCardItemButtons;
