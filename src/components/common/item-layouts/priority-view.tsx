import * as React from 'react';
import {FC, HTMLAttributes, ReactNode} from 'react';
import csx from 'classnames';
import {priorityStyles} from './_styles';
import {ItemPriority} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {LowPriorityIcon} from '../icons/low-priority-icon';
import {NormalPriorityIcon} from '../icons/normal-priority-icon';
import {HighPriorityIcon} from '../icons/high-priority-icon';

type Props = HTMLAttributes<any> & {
  priority: ItemPriority;
};

const getIcon = (priority: ItemPriority): ReactNode => {
  if (priority === 'low') {
    return <LowPriorityIcon className="low" />;
  } else if (priority === 'normal') {
    return <NormalPriorityIcon className="normal" />;
  } else {
    return <HighPriorityIcon className="high" />;
  }
};

const PriorityView: FC<Props> = ({priority, className}: Props) => {
  const classes = priorityStyles();
  const classNames = csx(classes.root, className);
  const {t} = useTranslation();

  const icon = getIcon(priority);

  return (
    <Box className={classNames}>
      {icon} {t('items:priorities.' + priority)}
    </Box>
  );
};

export default PriorityView;
