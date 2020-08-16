import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import csx from 'classnames';
import {priorityStyles} from './_styles';
import {ItemPriority} from '../../../models/item';
import PaperBox from '../page-layouts/paper-box';
import {useTranslation} from 'react-i18next';

type Props = HTMLAttributes<any> & {
  priority: ItemPriority;
}

const Priority: FC<Props> = ({priority, className}: Props) => {
  const classes = priorityStyles();
  const classNames = csx(classes.root, className, classes[priority]);
  const {t} = useTranslation();

  return (
    <PaperBox text={t('items:priorities.' + priority)} className={classNames} />
  );
};

export default Priority;
