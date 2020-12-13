import {Group} from '../../../models/group.model';
import {ColorScheme} from '../../../shared/theme/colors';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';

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
  public static mapPropsToValues = (group: Group): GroupFormValues =>
    group
      ? {
          title: group.title,
          color: group.color,
          imageFilename: group.imageFilename,
          imageContent: null,
        }
      : defaultGroupFormValues;

  public static validationSchema = Yup.object().shape({
    title: Yup.string().required(() => i18n.t('group:fields.title.required')),
    color: Yup.string().required(() => i18n.t('group:fields.color.required')),
  });

  public static mapValuesToFormData = (values: GroupFormValues, group: Group): FormData => {
    const formData = new FormData();
    GroupFormUtils.addValueToForm(formData, 'id', group?.id);
    GroupFormUtils.addValueToForm(formData, 'title', values.title);
    GroupFormUtils.addValueToForm(formData, 'color', values.color);
    GroupFormUtils.addValueToForm(formData, 'imageFilename', values.imageFilename);
    GroupFormUtils.addValueToForm(formData, 'imageContent', values.imageContent);
    return formData;
  };

  private static addValueToForm = (formData: FormData, name: string, value: any): void => {
    if (value) {
      formData.append(name, value);
    }
  };
}
