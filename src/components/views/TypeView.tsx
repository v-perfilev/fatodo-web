import React, {HTMLAttributes, ReactNode, useMemo} from 'react';
import csx from 'classnames';
import {ItemType} from '../../models/item.model';
import {useTranslation} from 'react-i18next';
import {Box, Theme, Tooltip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TaskIcon from '../icons/TaskIcon';
import EventIcon from '../icons/EventIcon';
import RepetitionIcon from '../icons/RepetitionIcon';
import NoteIcon from '../icons/NoteIcon';

type TypeViewProps = HTMLAttributes<HTMLElement> & {
  type: ItemType;
  withoutText?: boolean;
};

const TypeView = ({type, withoutText, className}: TypeViewProps) => {
  const classes = typeStyles();
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactNode>(() => {
    if (type === 'TASK') {
      return <TaskIcon />;
    } else if (type === 'EVENT') {
      return <EventIcon />;
    } else if (type === 'REPETITION') {
      return <RepetitionIcon />;
    } else {
      return <NoteIcon />;
    }
  }, [type]);

  const text = useMemo<string>(() => {
    return t('common:types.' + type);
  }, [type, i18n.language]);

  const classNames = csx(classes.root, className);

  return withoutText ? (
    <Box className={classNames}>
      <Tooltip className={classes.tooltip} title={text}>
        <Box>{icon}</Box>
      </Tooltip>
    </Box>
  ) : (
    <Box className={classNames}>
      {icon}
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};

const typeStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: theme.palette.primary.main,
      fontSize: '1.2rem',
    },
  },
  tooltip: {
    display: 'flex',
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

export default TypeView;
