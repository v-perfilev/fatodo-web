import {FormUtils} from '../../../shared/utils/form.utils';
import {GradientColor} from '../../../shared/utils/color.utils';
import {Group} from '../../../models/group.model';

export interface GroupFormValues {
  title: string;
  color: GradientColor;
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
    const formItem = {
      id: group.id ?? null,
      title: values.title,
      color: values.color,
      imageFilename: values.imageFilename,
      imageContent: values.imageContent,
    };
    return FormUtils.toFormData(formItem);
  };

}
