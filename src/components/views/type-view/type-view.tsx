import * as React from 'react';
import {FC, HTMLAttributes, ReactNode, useMemo} from 'react';
import csx from 'classnames';
import {typeStyles} from './_styles';
import {ItemType} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import {Box, Tooltip} from '@material-ui/core';
import {TaskIcon} from '../../icons/TaskIcon';
import {EventIcon} from '../../icons/EventIcon';
import {RepetitionIcon} from '../../icons/RepetitionIcon';
import {NoteIcon} from '../../icons/NoteIcon';

type Props = HTMLAttributes<HTMLElement> & {
  type: ItemType;
  withoutText?: boolean;
};

export const TypeView: FC<Props> = ({type, withoutText, className}: Props) => {
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
