import * as React from 'react';
import {FC, HTMLAttributes, useEffect} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {groupCardItemStyles} from './_styles';
import {animated} from 'react-spring';
import Truncate from 'react-truncate';
import {Item} from '../../../models/item.model';
import {Routes} from '../../router';
import {ItemRoutes} from '../../item/_router';
import {Link} from '../../../components/controls';
import withItemView from '../../../shared/hocs/with-view/with-item-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {flowRight} from 'lodash';
import {PriorityView, TypeView} from '../../../components/views';
import GroupPreviewCardItemChanges from './group-preview-card-item-changes';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupPreviewCardItem: FC<Props> = ({item, style}: Props) => {
  const classes = groupCardItemStyles();
  const {setObj: setItem} = useItemViewContext();

  useEffect(() => {
    setItem(item);
  }, [item]);

  return (
    <Box className={classes.root} style={style}>
      <Link to={(Routes.ITEMS + ItemRoutes.VIEW).replace(':itemId', item.id)}>
        <Card variant="outlined" className={classes.card}>
          <Box className={classes.topBox}>
            <Box className={classes.iconBox}>
              <TypeView className={classes.icon} type={item.type} withoutText />
              <PriorityView className={classes.icon} priority={item.priority} withoutText />
            </Box>
            <Box className={classes.titleBox}>
              <Typography className={classes.typography}>
                <Truncate>{item.title}</Truncate>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.bottomBox}>
            <GroupPreviewCardItemChanges item={item} />
          </Box>
        </Card>
      </Link>
    </Box>
  );
};

export default flowRight([animated, withItemView])(GroupPreviewCardItem);
