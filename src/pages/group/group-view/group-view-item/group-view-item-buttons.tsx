import React, {FC, memo, useCallback, useRef, useState} from 'react';
import {Box, IconButton, Theme, useMediaQuery} from '@material-ui/core';
import {EditIcon} from '../../../../components/icons/edit-icon';
import {DeleteIcon} from '../../../../components/icons/delete-icon';
import {Item} from '../../../../models/item.model';
import {ItemRouteUtils} from '../../../item/_router';
import {useHistory} from 'react-router-dom';
import {useItemDialogContext} from '../../../../shared/contexts/dialog-contexts/item-dialog-context';
import {PackageUpIcon} from '../../../../components/icons/package-up-icon';
import {PackageDownIcon} from '../../../../components/icons/package-down-icon';
import ItemService from '../../../../services/item.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {useItemListContext} from '../../../../shared/contexts/list-contexts/item-list-context';
import {useArchivedItemListContext} from '../../../../shared/contexts/list-contexts/archived-item-list-context';
import {useTranslation} from 'react-i18next';
import {EyeIcon} from '../../../../components/icons/eye-icon';
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

const GroupViewItemButtonsBig: FC<ButtonProps> = ({menuItems}: ButtonProps) => {
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

const GroupViewItemButtonsSmall: FC<ButtonProps> = ({menuItems}: ButtonProps) => {
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
  canEdit: boolean;
};

const GroupViewItemButtons: FC<Props> = ({item, canEdit}: Props) => {
  const history = useHistory();
  const {t} = useTranslation();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {handleResponse} = useSnackContext();
  const {showItemDeleteDialog} = useItemDialogContext();
  const {addItem: addActive, removeItem: removedActive} = useItemListContext();
  const {addItem: addArchived, removeItem: removeArchived} = useArchivedItemListContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);
  const redirectToEditItem = (): void => history.push(ItemRouteUtils.getEditUrl(item.id));

  const toggleArchived = useCallback((): void => {
    setArchivedLoading(true);
    ItemService.updateItemArchived(item.id, !item.archived)
      .then(() => {
        const updatedItem = {...item, archived: !item.archived};
        const removeFromPreviousList = item.archived ? removeArchived : removedActive;
        const addToNextList = item.archived ? addActive : addArchived;
        removeFromPreviousList(item.id);
        addToNextList(updatedItem);
      })
      .catch((response) => {
        handleResponse(response);
        setArchivedLoading(false);
      });
  }, [item, setArchivedLoading, removeArchived, removedActive, addArchived, addActive, handleResponse]);

  const openItemDeleteDialog = useCallback((): void => {
    const onSuccess = (): void => (item.archived ? removeArchived(item.id) : removedActive(item.id));
    showItemDeleteDialog(item, onSuccess);
  }, [item, removeArchived, removedActive, showItemDeleteDialog]);

  const clickOnViewButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    redirectToViewItem();
  };

  const clickOnEditButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    redirectToEditItem();
  };

  const clickOnArchivedButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleArchived();
  };

  const clickOnDeleteButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    openItemDeleteDialog();
  };

  const menuItems = [
    {action: clickOnViewButton, icon: <EyeIcon color="primary" />, text: t('group:tooltips.view')},
    {
      action: clickOnArchivedButton,
      icon: item.archived ? <PackageUpIcon color="primary" /> : <PackageDownIcon color="primary" />,
      text: item.archived ? t('group:tooltips.removeFromArchive') : t('group:tooltips.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      show: canEdit,
    },
    {action: clickOnEditButton, icon: <EditIcon color="primary" />, text: t('group:tooltips.edit')},
    {action: clickOnDeleteButton, icon: <DeleteIcon color="error" />, text: t('group:tooltips.delete')},
  ] as PopupMenuItemProps[] | TooltipIconButtonProps[];

  return isBigDevice ? (
    <GroupViewItemButtonsBig menuItems={menuItems} />
  ) : (
    <GroupViewItemButtonsSmall menuItems={menuItems} />
  );
};

export default memo(GroupViewItemButtons);
