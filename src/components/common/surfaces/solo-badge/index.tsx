import React, {FC} from 'react';
import {Badge, BadgeProps} from '@material-ui/core';
import {soloBadgeStyles} from './_styles';

type Props = BadgeProps;

export const SoloBadge: FC<Props> = (props: Props) => {
  const classes = soloBadgeStyles();

  return (
    <Badge className={classes.root} {...props} />
  );
};
