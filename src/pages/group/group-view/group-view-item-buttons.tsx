import React, {FC} from 'react';
import {Hidden, IconButton} from '@material-ui/core';
import {groupViewItemButtonsStyles} from './_styles';
import {EditIcon} from '../../../components/icons/edit-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemButtons: FC<Props> = ({item, canEdit}: Props) => {
  const classes = groupViewItemButtonsStyles();
  const history = useHistory();
  const {load: loadItems} = useItemListContext();
  const {showItemDeleteDialog} = useItemDialogContext();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);
  const redirectToEditItem = (): void => history.push(ItemRouteUtils.getEditUrl(item.id));

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => loadItems();
    showItemDeleteDialog(item, onSuccess);
  };

  return (
    <>
      <Hidden xsDown>
        <IconButton size="small" className={classes.showIcon} onClick={redirectToViewItem}>
          <EyeIcon />
        </IconButton>
      </Hidden>
      {canEdit && (
        <IconButton size="small" className={classes.editIcon} onClick={redirectToEditItem}>
          <EditIcon />
        </IconButton>
      )}
      {canEdit && (
        <IconButton size="small" className={classes.deleteIcon} onClick={openItemDeleteDialog}>
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default GroupViewItemButtons;
