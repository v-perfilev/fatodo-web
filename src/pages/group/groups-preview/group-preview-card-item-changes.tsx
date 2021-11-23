import React, {FC, HTMLAttributes, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {Item} from '../../../models/item.model';
import {groupCardItemChangesStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupPreviewCardItemChanges: FC<Props> = ({item}: Props) => {
  const classes = groupCardItemChangesStyles();

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
    return !item.lastModifiedAt || item.createdAt === item.lastModifiedAt
      ? DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt))
      : DateFormatters.formatDependsOnDay(timestampToDate(item.lastModifiedAt));
  }, [item]);

  return <Box className={classes.root}>{formattedDate}</Box>;
};

export default GroupPreviewCardItemChanges;
