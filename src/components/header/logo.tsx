import * as React from 'react';
import { createStyles, Link, Typography, withStyles } from '@material-ui/core';

const styles = () => createStyles({
  white: {
    color: 'white',
  },
});

const Logo = (props) => {
  const {classes} = props;
  const preventDefault = (event) => event.preventDefault();

  return (
    <Link href="#" onClick={preventDefault}>
      <Typography variant="h6" className={classes.white}>
        FaToDo
      </Typography>
    </Link>
  );
}

export default withStyles(styles)(Logo);
