import React from 'react';
import {Badge, BadgeProps} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type SoloBadgeProps = BadgeProps;

const SoloBadge = (props: SoloBadgeProps) => {
  const classes = soloBadgeStyles();

  return <Badge className={classes.root} {...props} />;
};

const soloBadgeStyles = makeStyles(() => ({
  root: {
    '& .MuiBadge-badge': {
      position: 'relative !important',
      transform: 'none !important',
    },
  },
}));

export default SoloBadge;
