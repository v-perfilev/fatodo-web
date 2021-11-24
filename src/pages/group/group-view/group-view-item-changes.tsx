import React, {FC, HTMLAttributes, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {Item} from '../../../models/item.model';
import {groupViewItemChangesStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupViewItemChanges: FC<Props> = ({item}: Props) => {
  const classes = groupViewItemChangesStyles();

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
    return DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt));
  }, [item]);

  return <Box className={classes.root}>{formattedDate}</Box>;
};

export default GroupViewItemChanges;
