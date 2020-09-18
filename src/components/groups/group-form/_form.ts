import {FormUtils} from '../../../shared/utils/form.utils';
import {ColorScheme} from '../../../shared/utils/color-scheme.utils';
import {Group} from '../../../models/group.model';

export interface GroupFormValues {
  title: string;
  color: ColorScheme;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultGroupFormValues: Readonly<GroupFormValues> = {
  title: '',
  color: 'yellow',
  imageFilename: null,
  imageContent: null,
};

export class GroupFormUtils {

  public static mapGroupToValues = (group: Group): GroupFormValues => group ? {
    title: group.title,
    color: group.color,
    imageFilename: group.imageFilename,
    imageContent: null,
  } : defaultGroupFormValues;

  public static mapValuesToFormData = (values: GroupFormValues, group: Group): FormData => {
    const form = {
      id: group ? group.id : null,
      title: values.title,
      color: values.color,
      imageFilename: values.imageFilename,
      imageContent: values.imageContent,
    };
    return FormUtils.toFormData(form);
  };

}
