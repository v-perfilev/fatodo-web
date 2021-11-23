import * as React from 'react';
import {FC, ReactNode, useMemo} from 'react';
import {priorityStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {ItemPriority} from '../../../models/item.model';
import {LowPriorityIcon} from '../../icons/low-priority-icon';
import {NormalPriorityIcon} from '../../icons/normal-priority-icon';
import {HighPriorityIcon} from '../../icons/high-priority-icon';

type Props = {
  priority: ItemPriority;
  withoutText?: boolean;
};

export const PriorityView: FC<Props> = ({priority, withoutText}: Props) => {
  const classes = priorityStyles();
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactNode>(() => {
    if (priority === 'LOW') {
      return <LowPriorityIcon className="low" />;
    } else if (priority === 'NORMAL') {
      return <NormalPriorityIcon className="normal" />;
    } else {
      return <HighPriorityIcon className="high" />;
    }
  }, [priority]);

  const label = useMemo<string>(() => {
    return !withoutText && t('common:priorities.' + priority);
  }, [priority, withoutText, i18n.language]);

  return (
    <Box className={classes.root}>
      {icon} {label}
    </Box>
  );
};
