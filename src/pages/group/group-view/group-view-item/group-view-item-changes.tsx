import React, {FC, HTMLAttributes, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {Item} from '../../../../models/item.model';
import {groupViewItemChangesStyles} from './_styles';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupViewItemChanges: FC<Props> = ({item}: Props) => {
  const classes = groupViewItemChangesStyles();
  const {users} = useUserListContext();

  const name = useMemo<string>(() => {
    const user = users.find((user) => user.id === item.createdBy);
    return user?.username;
  }, [users]);

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
    return DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt));
  }, [item]);

  return (
    <Box>
      <span className={classes.name}>{name}</span>
      <span className={classes.slash}>/</span>
      <span className={classes.date}>{formattedDate}</span>
    </Box>
  );
};

export default GroupViewItemChanges;
