import * as React from 'react';
import { createStyles, Link, Typography, WithStyles, withStyles } from '@material-ui/core';

const styles = () => createStyles({
  white: {
    color: 'white',
  },
});

type Props = WithStyles<typeof styles>;

const Logo = ({ classes }: Props) => {
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
