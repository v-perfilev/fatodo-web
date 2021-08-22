import * as React from 'react';
import {FC, HTMLAttributes, useEffect} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {CheckIcon} from '../../../components/icons/check-icon';
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
    <Box className={classes.item}>
      <Link to={(Routes.ITEMS + ItemRoutes.VIEW).replace(':itemId', item.id)}>
        <Card square variant="outlined" className={classes.card} style={style}>
          <CheckIcon className={classes.icon} />
          <Typography className={classes.typography}>
            <Truncate>{item.title}</Truncate>
          </Typography>
        </Card>
      </Link>
    </Box>
  );
};

export default flowRight([animated, withItemView])(GroupPreviewCardItem);