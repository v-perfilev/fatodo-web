import React, {FC, useState} from 'react';
import {IconButton} from '@material-ui/core';
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

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemButtons: FC<Props> = ({item, canEdit}: Props) => {
  const classes = groupViewItemButtonsStyles();
  const history = useHistory();
  const {handleResponse} = useSnackContext();
  const {showItemDeleteDialog} = useItemDialogContext();
  const {addItem: addActive, removeItem: removedActive} = useItemListContext();
  const {addItem: addArchived, removeItem: removeArchived} = useArchivedItemListContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const redirectToEditItem = (): void => {
    history.push(ItemRouteUtils.getEditUrl(item.id));
  };

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

  return (
    <>
      {canEdit && archivedLoading && <CircularSpinner size="xs" />}
      {canEdit && !archivedLoading && (
        <IconButton size="small" className={classes.archivedIcon} onClick={clickOnArchivedButton}>
          {item.archived ? <PackageUpIcon /> : <PackageDownIcon />}
        </IconButton>
      )}
      {canEdit && (
        <IconButton size="small" className={classes.editIcon} onClick={clickOnEditButton}>
          <EditIcon />
        </IconButton>
      )}
      {canEdit && (
        <IconButton size="small" className={classes.deleteIcon} onClick={clickOnDeleteButton}>
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default GroupViewItemButtons;
