import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import csx from 'classnames';
import {priorityStyles} from './_styles';
import {ItemPriority} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';

type Props = HTMLAttributes<any> & {
  priority: ItemPriority;
}

const ReminderView: FC<Props> = ({priority, className}: Props) => {
  const classes = priorityStyles();
  const classNames = csx(classes.root, className, classes[priority]);
  const {t} = useTranslation();

  return <Box>Test</Box>;
};

export default ReminderView;
