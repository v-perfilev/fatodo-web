import React, {FC} from 'react';
import {Box, Hidden} from '@material-ui/core';
import {groupViewItemStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Link} from '../../../components/controls';
import {ItemRouteUtils} from '../../item/_router';
import {PriorityView, TypeView} from '../../../components/views';
import GroupViewItemChanges from './group-view-item-changes';
import GroupViewItemButtons from './group-view-item-buttons';

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItem: FC<Props> = ({item, canEdit}: Props) => {
  const classes = groupViewItemStyles();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);

  return (
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
        <TypeView className={classes.icon} type={item.type} withoutText />
        <PriorityView className={classes.icon} priority={item.priority} withoutText />
      </Box>
      <Box className={classes.contentBox}>
        <Link to={viewItemUrl} color="textPrimary" withHoverUnderline>
          {item.title}
        </Link>
      </Box>
      <Hidden xsDown>
        <GroupViewItemChanges item={item} />
      </Hidden>
      <Box className={classes.managementBox}>
        <GroupViewItemButtons item={item} canEdit={canEdit} />
      </Box>
    </Box>
  );
};

export default GroupViewItem;
