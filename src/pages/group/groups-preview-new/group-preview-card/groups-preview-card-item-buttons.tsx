import React, {FC, memo, useCallback, useRef, useState} from 'react';
import {Box, IconButton, Theme, useMediaQuery} from '@material-ui/core';
import {Item} from '../../../../models/item.model';
import {ItemRouteUtils} from '../../../item/_router';
import {EyeIcon} from '../../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  PopupMenu,
  PopupMenuItem,
  PopupMenuItemProps,
  TooltipIconButton,
  TooltipIconButtonProps,
} from '../../../../components/surfaces';
import {DotsVerticalIcon} from '../../../../components/icons/dots-vertical-icon';

type ButtonProps = {
  menuItems: TooltipIconButtonProps[];
};

const GroupsPreviewCardItemButtonsBig: FC<ButtonProps> = ({menuItems}: ButtonProps) => {
  return (
    <>
      {menuItems.map((item, index) => (
        <TooltipIconButton
          action={item.action}
          icon={item.icon}
          text={item.text}
          loading={item.loading}
          disabled={item.disabled}
          show={item.show}
          key={index}
        />
      ))}
    </>
  );
};

const GroupsPreviewCardItemButtonsSmall: FC<ButtonProps> = ({menuItems}: ButtonProps) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <Box>
          {menuItems.map((item, index) => (
            <PopupMenuItem
              action={item.action}
              icon={item.icon}
              text={item.text}
              loading={item.loading}
              disabled={item.disabled}
              show={item.show}
              key={index}
            />
          ))}
        </Box>
      </PopupMenu>
    </>
  );
};

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
