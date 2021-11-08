import {Item, itemPriorities, ItemPriority, ItemType, itemTypes} from '../../../models/item.model';
import {Reminder} from '../../../models/reminder.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {Group} from '../../../models/group.model';
import {ItemDTO} from '../../../models/dto/item.dto';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';

export interface ItemFormValues {
  title: string;
  type: ItemType;
  priority: ItemPriority;
  time?: Date;
  date?: Date;
  description?: string;
  reminders?: Reminder[];
  tags?: string[];
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  type: itemTypes[0],
  priority: itemPriorities[1],
  time: null,
  date: null,
  description: '',
  reminders: [],
  tags: [],
};

export class ItemFormUtils {
  public static mapPropsToValues = (item: Item, reminders: Reminder[]): ItemFormValues =>
    item
      ? {
          title: item.title,
          type: item.type,
          priority: item.priority,
          time: DateConverters.getTimeFromParamDate(item.date),
          date: DateConverters.getDateFromParamDate(item.date),
          description: item.description,
          reminders: reminders,
          tags: item.tags,
        }
      : defaultItemFormValues;

  public static validationSchema = Yup.object().shape({
    title: Yup.string().required(() => i18n.t('item:fields.title.required')),
    type: Yup.string().required(() => i18n.t('item:fields.type.required')),
    priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
  });

  public static mapValuesToDTO = (values: ItemFormValues, item: Item, group: Group, reminders: Reminder[]): ItemDTO => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;
    return {
      id: item ? item.id : null,
      title: values.title,
      type: values.type,
      priority: values.priority,
      date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date),
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      tags: values.tags,
      groupId: group.id,
      deleteReminders: deleteReminders ? true : undefined,
    };
  };
}
