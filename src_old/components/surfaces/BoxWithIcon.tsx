import React, {HTMLAttributes, ReactNode} from 'react';
import {Box, Theme, Typography} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type BoxWithIconProps = HTMLAttributes<HTMLElement> & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, children, className}: BoxWithIconProps) => {
  const classes = labeledBoxStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      {icon}
      <Typography variant="body2" className={classes.text}>
        {children}
      </Typography>
    </Box>
  );
};

const labeledBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

export default BoxWithIcon;
