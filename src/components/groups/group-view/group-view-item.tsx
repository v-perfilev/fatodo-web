import React, {FC, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import {groupViewItemStyles} from './_styles';
import {CheckIcon} from '../../common/icons/check-icon';
import {PackageDownIcon} from '../../common/icons/package-down-icon';
import {EditIcon} from '../../common/icons/edit-icon';
import {DeleteIcon} from '../../common/icons/delete-icon';
import {Item} from '../../../models/item.model';
import {Link} from '../../common/controls/link';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../common/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {DeleteItemDialog} from '../../common/dialogs/delete-item-dialog';

type Props = {
  item: Item;
  loadItems: () => void;
};

const GroupViewItem: FC<Props> = ({item, loadItems}: Props) => {
  const classes = groupViewItemStyles();
  const history = useHistory();
  const [itemToDelete, setItemToDelete] = useState<Item>(null);

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);
  const redirectToEditItem = (): void => history.push(ItemRouteUtils.getEditUrl(item.id));

  const openDeleteDialog = (): void => {
    setItemToDelete(item);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
        <CheckIcon className={classes.icon} />
      </Box>
      <Box className={classes.contentBox}>
        <Link to={viewItemUrl} color="textPrimary" withUnderline>
          {item.title}
        </Link>
      </Box>
      <Box className={classes.managementBox}>
        <IconButton size="small" className={classes.showIcon} onClick={redirectToViewItem}>
          <EyeIcon />
        </IconButton>
        <IconButton size="small" className={classes.editIcon} onClick={redirectToEditItem}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" className={classes.toggleIcon}>
          <PackageDownIcon />
        </IconButton>
        <IconButton size="small" className={classes.deleteIcon} onClick={openDeleteDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <DeleteItemDialog item={itemToDelete} setItem={setItemToDelete} onSuccess={loadItems} />
    </Box>
  );
};

export default GroupViewItem;
