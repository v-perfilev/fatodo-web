import React, { FC, HTMLAttributes } from 'react';
import { Box } from '@material-ui/core';
import ItemViewGroup from './item-view-group';
import ItemViewType from './item-view-type';
import ItemViewPriority from './item-view-priority';
import { itemViewCommonStyles, itemViewInfoStyles } from './_styles';
import csx from 'classnames';
import ItemViewDate from './item-view-date';

type Props = HTMLAttributes<any>;

const ItemViewInfo: FC<Props> = ({ className }: Props) => {
  const classes = itemViewInfoStyles();
  const commonClasses = itemViewCommonStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <ItemViewGroup className={commonClasses.box} />
      <ItemViewType className={commonClasses.box} />
      <ItemViewPriority className={commonClasses.box} />
      <ItemViewDate className={commonClasses.box} />
    </Box>
  );
};

export default ItemViewInfo;
