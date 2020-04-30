import * as React from 'react';
import {FC} from 'react';
import {createStyles, Link, StyleRules, Typography, WithStyles, withStyles} from '@material-ui/core';

const styles = (): StyleRules<any> =>
  createStyles({
    white: {
      color: 'white',
    },
  });

type Props = WithStyles<typeof styles>;

const Logo: FC<any> = ({classes}: Props) => {
  const preventDefault = (event): void => event.preventDefault();

  return (
    <Link href="#" onClick={preventDefault}>
      <Typography variant="h6" className={classes.white}>
        FaToDo
      </Typography>
    </Link>
  );
};

export default withStyles(styles)(Logo);
