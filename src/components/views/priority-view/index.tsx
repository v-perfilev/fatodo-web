import * as React from 'react';
import {FC, HTMLAttributes, ReactNode, useMemo} from 'react';
import {priorityStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {Box, Tooltip} from '@material-ui/core';
import {ItemPriority} from '../../../models/item.model';
import {LowPriorityIcon} from '../../icons/low-priority-icon';
import {NormalPriorityIcon} from '../../icons/normal-priority-icon';
import {HighPriorityIcon} from '../../icons/high-priority-icon';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  priority: ItemPriority;
  withoutText?: boolean;
};

export const PriorityView: FC<Props> = ({priority, withoutText, className}: Props) => {
  const classes = priorityStyles();
  const classNames = csx(classes.root, className);
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

  const text = useMemo<string>(() => {
    return t('common:priorities.' + priority);
  }, [priority, i18n.language]);

  return withoutText ? (
    <Box className={classNames}>
      <Tooltip className={classes.tooltip} title={text}>
        <Box>{icon}</Box>
      </Tooltip>
    </Box>
  ) : (
    <Box className={classNames}>
      {icon} {text}
    </Box>
  );
};
