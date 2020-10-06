import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {Item} from '../../../models/item.model';
import {itemViewChangesStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/layouts/labeled-box';
import {DateFormatters} from '../../../shared/utils/date.utils';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  item: Item;
};

const ItemViewChanges: FC<Props> = ({item, className}: Props) => {
  const classes = itemViewChangesStyles();
  const {t} = useTranslation();

  const getDate = (timestamp: string): string => {
    const timestampNumber = Number(timestamp) * 1000;
    return DateFormatters.formatTime(new Date(timestampNumber))
      + ' ' + DateFormatters.formatDateWithYear(new Date(timestampNumber));
  };

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <LabeledBox label={t('items:labels.createdBy')}>
        <Box>{item.createdBy}</Box>
      </LabeledBox>
      <LabeledBox label={t('items:labels.createdAt')}>
        <Box>{getDate(item.createdAt)}</Box>
      </LabeledBox>
      {item.updatedBy && (
        <LabeledBox label={t('items:labels.updatedBy')}>
          <Box>{item.updatedBy}</Box>
        </LabeledBox>
      )}
      {item.updatedAt && (
        <LabeledBox label={t('items:labels.updatedAt')}>
          <Box>{item.updatedAt}</Box>
        </LabeledBox>
      )}
    </Box>
  );
};

export default ItemViewChanges;
