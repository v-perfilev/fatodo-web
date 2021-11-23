import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../../components/surfaces';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {Item} from '../../../models/item.model';
import {groupCardItemChangesStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  item: Item;
};

const GroupPreviewCardItemChanges: FC<Props> = ({item}: Props) => {
  const classes = groupCardItemChangesStyles();
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

export default GroupPreviewCardItemChanges;
