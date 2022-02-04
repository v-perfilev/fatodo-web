import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {groupsPreviewCardItemStyles} from './_styles';
import Truncate from 'react-truncate';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {Link} from '../../../components/controls';
import {PriorityView, StatusView, TypeView} from '../../../components/views';
import GroupsPreviewCardItemChanges from './groups-preview-card-item-changes';
import GroupsPreviewCardItemButtons from './groups-preview-card-item-buttons';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupsPreviewCardItem: FC<Props> = ({item}: Props) => {
  const classes = groupsPreviewCardItemStyles();

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
            <GroupsPreviewCardItemChanges item={item} />
          </Box>
          <Box className={classes.buttonsCol}>
            <GroupsPreviewCardItemButtons item={item} />
          </Box>
        </Card>
      </Link>
    </Box>
  );
};

export default GroupsPreviewCardItem;
