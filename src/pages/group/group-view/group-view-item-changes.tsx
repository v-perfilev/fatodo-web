import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../../components/surfaces';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {Item} from '../../../models/item.model';
import {groupViewItemChangesStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupViewItemChanges: FC<Props> = ({item}: Props) => {
  const classes = groupViewItemChangesStyles();
  const {t} = useTranslation();

  const getDate = (timestamp: number): string => {
    const timestampNumber = timestamp * 1000;
    return DateFormatters.formatTimeWithDate(new Date(timestampNumber));
  };

  return (
    <Box className={classes.root}>
      {item.createdAt !== item.lastModifiedAt && (
        <LabeledBox label={t('item:labels.createdAt')}>
          <Box>{getDate(item.createdAt)}</Box>
        </LabeledBox>
      )}
      {item.createdAt === item.lastModifiedAt && (
        <LabeledBox label={t('item:labels.updatedAt')}>
          <Box>{getDate(item.lastModifiedAt)}</Box>
        </LabeledBox>
      )}
    </Box>
  );
};

export default GroupViewItemChanges;
