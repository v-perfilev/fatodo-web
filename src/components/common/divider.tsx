import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {dividerStyles} from './_styles';
import {GradientColor} from '../_types';

type Props = {
  color: GradientColor,
  height?: number;
};

const Divider: FC<Props> = (props: Props) => {
  const classes = dividerStyles();
  const {color} = props;

  const colorClass = color === 'yellow' ? classes.yellow
    : classes.green;

  const dividerClassNames = csx(classes.root, colorClass);
  const style = {height: props.height ? props.height : 1};

  return (
    <Box className={dividerClassNames} style={style} />
  );
};

export default Divider;
