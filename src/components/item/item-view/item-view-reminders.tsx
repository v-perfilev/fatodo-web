import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {ReminderView} from '../../common/views/reminder-view';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewReminders: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  const showReminders = item.reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('items:labels.reminders')} className={className}>
        {item.reminders.map((reminder, index) => (
          <Chip key={index} size="medium" label={<ReminderView reminder={reminder} />} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewReminders;
