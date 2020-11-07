import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {ReminderView} from '../../common/views/reminder-view';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {itemViewCommonStyles} from './_styles';

const ItemViewReminders: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  const showReminders = item.reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('item:labels.reminders')}>
        {item.reminders.map((reminder, index) => (
          <Chip key={index} size="medium" label={<ReminderView reminder={reminder} />} className={commonClasses.box} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewReminders;
