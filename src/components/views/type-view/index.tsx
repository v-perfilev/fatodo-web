import * as React from 'react';
import {FC, HTMLAttributes, ReactNode} from 'react';
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
};

export const TypeView: FC<Props> = ({type, className}: Props) => {
  const classes = typeStyles();
  const classNames = csx(classes.root, className);
  const {t} = useTranslation();

  const icon = (): ReactNode => {
    if (type === 'TASK') {
      return <TaskIcon />;
    } else if (type === 'EVENT') {
      return <EventIcon />;
    } else if (type === 'REPETITION') {
      return <RepetitionIcon />;
    } else {
      return <NoteIcon />;
    }
  };

  return (
    <Box className={classNames}>
      {icon()} {t('common:types.' + type)}
    </Box>
  );
};
