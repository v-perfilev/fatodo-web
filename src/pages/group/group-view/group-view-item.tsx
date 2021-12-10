import React, {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {groupViewItemStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Link} from '../../../components/controls';
import {ItemRouteUtils} from '../../item/_router';
import {PriorityView, TypeView} from '../../../components/views';
import GroupViewItemChanges from './group-view-item-changes';
import GroupViewItemButtons from './group-view-item-buttons';
import GroupViewItemStatus from './group-view-item-status';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
  canEdit: boolean;
};

const GroupViewItem: FC<Props> = ({item, canEdit}: Props) => {
  const classes = groupViewItemStyles();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);

  return (
    <Box className={classes.root}>
      <Link to={viewItemUrl}>
        <Card variant="outlined" className={classes.card}>
          <Box className={classes.statusCol}>
            <GroupViewItemStatus item={item} canEdit={canEdit} />
          </Box>
          <Box className={classes.iconsCol}>
            <TypeView className={classes.icon} type={item.type} withoutText />
            <PriorityView className={classes.icon} priority={item.priority} withoutText />
          </Box>
          <Box className={classes.contentCol}>
            <Typography>{item.title}</Typography>
            <GroupViewItemChanges item={item} />
          </Box>
          <Box className={classes.buttonsCol}>
            <GroupViewItemButtons item={item} canEdit={canEdit} />
          </Box>
        </Card>
      </Link>
    </Box>
  );
};

export default GroupViewItem;
