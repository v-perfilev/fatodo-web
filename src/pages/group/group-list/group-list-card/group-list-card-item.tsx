import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {groupListCardItemStyles} from './_styles';
import Truncate from 'react-truncate';
import {Item} from '../../../../models/item.model';
import {ItemRouteUtils} from '../../../item/_router';
import {Link} from '../../../../components/controls';
import {PriorityView, StatusView, TypeView} from '../../../../components/views';
import GroupListCardItemChanges from './group-list-card-item-changes';
import GroupsPreviewCardItemButtons from './group-list-card-item-buttons';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupListCardItem: FC<Props> = ({item}: Props) => {
  const classes = groupListCardItemStyles();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);

  return (
    <Box className={classes.root}>
      <Link to={viewItemUrl}>
        <Card variant="outlined" className={classes.card}>
          <Box className={classes.statusCol}>
            <StatusView statusType={item.status} />
          </Box>
          <Box className={classes.iconsCol}>
            <TypeView className={classes.icon} type={item.type} withoutText />
            <PriorityView className={classes.icon} priority={item.priority} withoutText />
          </Box>
          <Box className={classes.contentCol}>
            <Typography className={classes.typography}>
              <Truncate>{item.title}</Truncate>
            </Typography>
            <GroupListCardItemChanges item={item} />
          </Box>
          <Box className={classes.buttonsCol}>
            <GroupsPreviewCardItemButtons item={item} />
          </Box>
        </Card>
      </Link>
    </Box>
  );
};

export default GroupListCardItem;
