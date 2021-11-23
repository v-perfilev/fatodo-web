import * as React from 'react';
import {FC, HTMLAttributes, ReactNode, useMemo} from 'react';
import csx from 'classnames';
import {typeStyles} from './_styles';
import {ItemType} from '../../../models/item.model';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {TaskIcon} from '../../icons/task-icon';
import {EventIcon} from '../../icons/event-icon';
import {RepetitionIcon} from '../../icons/repetition-icon';
import {NoteIcon} from '../../icons/note-icon';

type Props = HTMLAttributes<HTMLElement> & {
  type: ItemType;
  withoutText?: boolean;
};

export const TypeView: FC<Props> = ({type, withoutText, className}: Props) => {
  const classes = typeStyles();
  const classNames = csx(classes.root, className);
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

  const label = useMemo<string>(() => {
    return !withoutText && t('common:types.' + type);
  }, [type, withoutText, i18n.language]);

  return (
    <Box className={classNames}>
      {icon} {label}
    </Box>
  );
};
