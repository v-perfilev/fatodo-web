import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {CheckIcon} from '../../common/icons/check-icon';
import {groupCardItemStyles} from './_styles';
import {compose} from 'recompose';
import {animated} from 'react-spring';
import Truncate from 'react-truncate';
import {Item} from '../../../models/item';

type Props = HTMLAttributes<any> & {
  item: Item;
};

const GroupPreviewCardItem: FC<Props> = ({item, style}: Props) => {
  const classes = groupCardItemStyles();

  return (
    <Box className={classes.item}>
      <Card square variant="outlined" className={classes.card} style={style}>
        <CheckIcon className={classes.icon} />
        <Typography className={classes.typography}>
          <Truncate>{item.title}</Truncate>
        </Typography>
      </Card>
    </Box>
  );
};

export default compose(animated)(GroupPreviewCardItem);
