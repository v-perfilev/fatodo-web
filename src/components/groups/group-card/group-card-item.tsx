import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, Card, Typography} from '@material-ui/core';
import {CheckIcon} from '../../common/icons/check-icon';
import {GroupItem} from '../_types';
import {groupCardItemStyles} from './_styles';
import {compose} from 'recompose';
import {animated} from 'react-spring';

interface ComponentProps {
  item: GroupItem;
}

type Props = ComponentProps & HTMLAttributes<any>;

const GroupCardItem: FC<Props> = ({item, style}: Props) => {
  const classes = groupCardItemStyles();

  return (
    <Box className={classes.item}>
      <Card square variant="outlined" className={classes.card} style={style}>
        <CheckIcon className={classes.icon} />
        <Typography>{item.title}</Typography>
      </Card>
    </Box>
  );
};

export default compose(animated)(GroupCardItem);
