import * as React from 'react';
import {FC, ReactNode} from 'react';
import {priorityStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {ItemPriority} from '../../../models/item.model';
import {LowPriorityIcon} from '../../icons/low-priority-icon';
import {NormalPriorityIcon} from '../../icons/normal-priority-icon';
import {HighPriorityIcon} from '../../icons/high-priority-icon';

type Props = {
  priority: ItemPriority;
};

export const PriorityView: FC<Props> = ({priority}: Props) => {
  const classes = priorityStyles();
  const {t} = useTranslation();

  const icon = (): ReactNode => {
    if (priority === 'LOW') {
      return <LowPriorityIcon className="low" />;
    } else if (priority === 'NORMAL') {
      return <NormalPriorityIcon className="normal" />;
    } else {
      return <HighPriorityIcon className="high" />;
    }
  };

  return (
    <Box className={classes.root}>
      {icon()} {t('common:priorities.' + priority)}
    </Box>
  );
};
