import React, {FC} from 'react';
import {Box, Hidden, IconButton} from '@material-ui/core';
import {groupViewItemStyles} from './_styles';
import {EditIcon} from '../../../components/icons/edit-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {Item} from '../../../models/item.model';
import {Link} from '../../../components/controls';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useItemDialogContext} from '../../../shared/contexts/dialog-contexts/item-dialog-context';
import {PriorityView, TypeView} from '../../../components/views';
import GroupViewItemChanges from './group-view-item-changes';

type Props = {
  item: Item;
};

const GroupViewItem: FC<Props> = ({item}: Props) => {
  const classes = groupViewItemStyles();
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
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
        <TypeView className={classes.icon} type={item.type} withoutText />
        <PriorityView className={classes.icon} priority={item.priority} withoutText />
      </Box>
      <Box className={classes.contentBox}>
        <Link to={viewItemUrl} color="textPrimary" withUnderline>
          {item.title}
        </Link>
      </Box>
      <Box>
        <GroupViewItemChanges item={item} />
      </Box>
      <Box className={classes.managementBox}>
        <Hidden xsDown>
          <IconButton size="small" className={classes.showIcon} onClick={redirectToViewItem}>
            <EyeIcon />
          </IconButton>
        </Hidden>
        <IconButton size="small" className={classes.editIcon} onClick={redirectToEditItem}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" className={classes.deleteIcon} onClick={openItemDeleteDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GroupViewItem;
