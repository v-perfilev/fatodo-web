import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {groupCardItemStyles} from './_styles';
import {animated} from 'react-spring';
import Truncate from 'react-truncate';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {Link} from '../../../components/controls';
import {flowRight} from 'lodash';
import {PriorityView, TypeView} from '../../../components/views';
import GroupPreviewCardItemChanges from './group-preview-card-item-changes';
import GroupPreviewCardItemButtons from './group-preview-card-item-buttons';
import {StatusView} from '../../../components/views/status-view';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupPreviewCardItem: FC<Props> = ({item, style}: Props) => {
  const classes = groupCardItemStyles();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);

  return (
    <Box style={style}>
      <Card variant="outlined" className={classes.card}>
        <Box className={classes.statusCol}>
          <StatusView statusType={item.status} />
        </Box>
        <Box className={classes.iconsCol}>
          <TypeView className={classes.icon} type={item.type} withoutText />
          <PriorityView className={classes.icon} priority={item.priority} withoutText />
        </Box>
        <Box className={classes.contentCol}>
          <Link to={viewItemUrl} color="textPrimary" withHoverUnderline>
            <Typography className={classes.typography}>
              <Truncate>{item.title}</Truncate>
            </Typography>
          </Link>
          <GroupPreviewCardItemChanges item={item} />
        </Box>
        <Box className={classes.buttonsCol}>
          <GroupPreviewCardItemButtons item={item} />
        </Box>
      </Card>
    </Box>
  );
};

export default flowRight([animated])(GroupPreviewCardItem);
