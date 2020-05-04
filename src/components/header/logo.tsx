import * as React from 'react';
import {FC} from 'react';
import {createStyles, Link, StyleRules, Typography, WithStyles, withStyles} from '@material-ui/core';
import {COLORS} from '../../shared/theme';

const styles = (): StyleRules<any> =>
  createStyles({
    white: {
      color: COLORS.WHITE,
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
