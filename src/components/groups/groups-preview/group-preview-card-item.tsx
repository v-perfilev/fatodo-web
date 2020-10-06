import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {CheckIcon} from '../../common/icons/check-icon';
import {groupCardItemStyles} from './_styles';
import {compose} from 'recompose';
import {animated} from 'react-spring';
import Truncate from 'react-truncate';
import {Item} from '../../../models/item.model';
import {Routes} from '../../router';
import {ItemRoutes} from '../../item/_router';
import {Link} from '../../common/layouts/link';

type Props = HTMLAttributes<any> & {
  item: Item;
};

const GroupPreviewCardItem: FC<Props> = ({item, style}: Props) => {
  const classes = groupCardItemStyles();

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

export default compose(animated)(GroupPreviewCardItem);
