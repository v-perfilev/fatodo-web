import * as React from 'react';
import {FC} from 'react';
import {Link, Typography} from '@material-ui/core';
import {logoStyles} from './_styles';

const useStyles = logoStyles;

const Logo: FC = () => {
  const classes = useStyles();

  const preventDefault = (event): void => event.preventDefault();

  return (
    <Link href="#" onClick={preventDefault}>
      <Typography variant="h6" className={classes.white}>
        FaToDo
      </Typography>
    </Link>
  );
};

export default Logo;
