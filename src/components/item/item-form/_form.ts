import {Item, itemPriorities, ItemPriority, ItemType, itemTypes} from '../../../models/item.model';
import {Reminder} from '../../../models/reminder.model';
import {DateConverters} from '../../../shared/utils/date.utils';
import {FormUtils} from '../../../shared/utils/form.utils';

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

  public static mapItemToValues = (item: Item): ItemFormValues => item ? {
    title: item.title,
    type: item.type,
    priority: item.priority,
    time: DateConverters.getTimeFromParamDate(item.date),
    date: DateConverters.getDateFromParamDate(item.date),
    description: item.description,
    reminders: item.reminders,
    tags: item.tags,
  } : defaultItemFormValues;

  public static mapValuesToFormData = (values: ItemFormValues, item: Item): FormData => {
    const formItem = {
      id: item ? item.id : null,
      title: values.title,
      type: values.type,
      priority: values.priority,
      date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date),
      description: values.description,
      reminders: values.reminders,
      tags: values.tags,
      group: item.group,
    };
    return FormUtils.toFormData(formItem);
  };

}
