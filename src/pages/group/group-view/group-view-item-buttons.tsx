import React, {FC, useCallback, useRef, useState} from 'react';
import {IconButton, MenuItem, Theme, Tooltip, useMediaQuery} from '@material-ui/core';
import {groupViewItemButtonsStyles} from './_styles';
import {EditIcon} from '../../../components/icons/edit-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {useHistory} from 'react-router-dom';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';
import {PackageUpIcon} from '../../../components/icons/package-up-icon';
import {PackageDownIcon} from '../../../components/icons/package-down-icon';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {CircularSpinner} from '../../../components/loaders';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useArchivedItemListContext} from '../../../shared/contexts/list-contexts/archived-item-list-context';
import {useTranslation} from 'react-i18next';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenu} from '../../../components/surfaces';

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemButtons: FC<Props> = ({item, canEdit}: Props) => {
  const classes = groupViewItemButtonsStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const {handleResponse} = useSnackContext();
  const {showItemDeleteDialog} = useItemDialogContext();
  const {addItem: addActive, removeItem: removedActive} = useItemListContext();
  const {addItem: addArchived, removeItem: removeArchived} = useArchivedItemListContext();
  const ref = useRef();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);
  const redirectToEditItem = (): void => history.push(ItemRouteUtils.getEditUrl(item.id));

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

  const toggleArchived = (): void => {
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
  };

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => (item.archived ? removeArchived(item.id) : removedActive(item.id));
    showItemDeleteDialog(item, onSuccess);
  };

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

  const bigDeviceView = (
    <>
      <Tooltip title={t('group:tooltips.view')}>
        <IconButton size="small" className={classes.showIcon} onClick={clickOnViewButton}>
          <EyeIcon />
        </IconButton>
      </Tooltip>
      {canEdit && archivedLoading && <CircularSpinner size="xs" />}
      {canEdit && !archivedLoading && (
        <Tooltip title={item.archived ? t('group:tooltips.removeFromArchive') : t('group:tooltips.moveToArchive')}>
          <IconButton size="small" className={classes.archivedIcon} onClick={clickOnArchivedButton}>
            {item.archived ? <PackageUpIcon /> : <PackageDownIcon />}
          </IconButton>
        </Tooltip>
      )}
      {canEdit && (
        <Tooltip title={t('group:tooltips.edit')}>
          <IconButton size="small" className={classes.editIcon} onClick={clickOnEditButton}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {canEdit && (
        <Tooltip title={t('group:tooltips.delete')}>
          <IconButton size="small" className={classes.deleteIcon} onClick={clickOnDeleteButton}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
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
        {canEdit && (
          <MenuItem onClick={clickOnArchivedButton} disabled={archivedLoading}>
            {!archivedLoading && <CircularSpinner size="xs" />}
            {archivedLoading && item.archived && <PackageUpIcon color="primary" />}
            {archivedLoading && !item.archived && <PackageDownIcon color="primary" />}
            {item.archived ? t('group:tooltips.removeFromArchive') : t('group:tooltips.moveToArchive')}
          </MenuItem>
        )}
        {canEdit && (
          <MenuItem onClick={clickOnEditButton}>
            <EditIcon color="primary" />
            {t('group:tooltips.edit')}
          </MenuItem>
        )}
        {canEdit && (
          <MenuItem onClick={clickOnDeleteButton}>
            <DeleteIcon color="error" />
            {t('group:tooltips.delete')}
          </MenuItem>
        )}
      </PopupMenu>
    </>
  );

  return isBigDevice ? bigDeviceView : smallDeviceView;
};

export default GroupViewItemButtons;
