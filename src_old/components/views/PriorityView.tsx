import React, {FC, HTMLAttributes, ReactNode, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Theme, Tooltip} from '@material-ui/core';
import {ItemPriorityType} from '../../models/item.model';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';

type Props = HTMLAttributes<HTMLElement> & {
  priority: ItemPriorityType;
  withoutText?: boolean;
};

const PriorityView: FC<Props> = ({priority, withoutText, className}: Props) => {
  const classes = priorityViewStyles();
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

const priorityViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '1.2rem',
      '&.low': {
        color: theme.palette.grey['400'],
      },
      '&.normal': {
        color: theme.palette.primary.main,
      },
      '&.high': {
        color: theme.palette.error.main,
      },
    },
  },
  tooltip: {
    display: 'flex',
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));

export default PriorityView;
