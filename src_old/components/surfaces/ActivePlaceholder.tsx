import React, {HTMLAttributes, ReactElement} from 'react';
import {Box, Paper, Theme} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type ActivePlaceholderProps = HTMLAttributes<HTMLElement> & {
  action: () => void;
  icon: ReactElement;
  text: string;
  height?: number | string;
  setRef?: (element: HTMLDivElement) => void;
  variant?: 'elevation' | 'outlined';
  orientation?: 'horizontal' | 'vertical';
  size?: 'md' | 'sm';
};

const ActivePlaceholder = (props: ActivePlaceholderProps) => {
  const {action, icon, text, variant, orientation, size, className} = props;
  const classes = activePlaceholderStyles();

  const classnames = csx(
    classes.root,
    {[classes.horizontal]: orientation === 'horizontal'},
    {[classes.small]: size === 'sm'},
    className,
  );

  return (
    <Paper variant={variant} elevation={3} className={classnames} onClick={action}>
      <Box className="icon">{icon}</Box>
      <Box className="text">{text}</Box>
    </Paper>
  );
};

const activePlaceholderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s',

    '& .icon': {
      width: 56,
      height: 56,
      borderRadius: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      background: theme.palette.grey['300'],
      transition: '0.3s',

      '& svg': {
        fontSize: '2rem',
      },
    },

    '& .text': {
      fontSize: '1.3rem',
      color: theme.palette.grey['400'],
      transition: '0.3s',
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[50],

      '& .icon': {
        background: theme.palette.grey['400'],
      },

      '& .text': {
        color: theme.palette.grey['500'],
      },
    },
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  small: {
    '& .icon': {
      width: 40,
      height: 40,

      '& svg': {
        fontSize: '1.3rem',
      },
    },

    '& .text': {
      fontSize: '1rem',
    },
  },
}));

export default ActivePlaceholder;
