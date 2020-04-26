import * as React from 'react';
import { createStyles, Link, Typography, WithStyles, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const styles = () =>
  createStyles({
    white: {
      color: 'white',
    },
  });

type Props = WithStyles<typeof styles>;

const Logo = ({ classes }: Props) => {
  const preventDefault = event => event.preventDefault();
  const { t, i18n } = useTranslation();

  // i18n.changeLanguage('de');
  return (
    <Link href="#" onClick={preventDefault}>
      <Typography variant="h6" className={classes.white}>
        FaToDo {t('test')}
      </Typography>
    </Link>
  );
};

export default withStyles(styles)(Logo);
