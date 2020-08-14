import React, {FC} from 'react';
import {GroupItem} from '../_types';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import csx from 'classnames';

type Props = {
  items: GroupItem[];
}

const GroupViewItems: FC<Props> = ({items}: Props) => {
  const classes = groupItemListStyles();

  const dividerClassNames = csx(classes.divider, classes.dividerYellow);

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <>
          {index !== 0 && (
            <Box className={dividerClassNames} />
          )}
          <GroupViewItem item={item} key={index} />
        </>
      ))}
    </Box>
  );
};

export default GroupViewItems;
