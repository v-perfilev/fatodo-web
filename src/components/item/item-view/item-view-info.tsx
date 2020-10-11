import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import ItemViewGroup from './item-view-group';
import ItemViewType from './item-view-type';
import ItemViewDate from './item-view-date';
import ItemViewPriority from './item-view-priority';
import {itemViewInfoStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<any>;

const ItemViewInfo: FC<Props> = ({className}: Props) => {
  const classes = itemViewInfoStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <ItemViewGroup />
      <ItemViewType />
      <ItemViewPriority />
      <ItemViewDate />
    </Box>
  );
};

export default ItemViewInfo;
