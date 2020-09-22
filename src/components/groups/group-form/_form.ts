import {Group} from '../../../models/group.model';
import {ColorScheme} from '../../../shared/theme/colors';
import {GroupDTO} from '../../../models/dto/group.dto';

export interface GroupFormValues {
  title: string;
  color: ColorScheme;
  imageFilename?: string;
  imageContent?: number[];
}

const defaultGroupFormValues: Readonly<GroupFormValues> = {
  title: '',
  color: 'yellow',
  imageFilename: null,
  imageContent: null,
};

export class GroupFormUtils {
  public static mapGroupToValues = (group: Group): GroupFormValues =>
    group
      ? {
        title: group.title,
        color: group.color,
        imageFilename: group.imageFilename,
        imageContent: null,
      }
      : defaultGroupFormValues;

  public static mapValuesToDTO = (values: GroupFormValues, group: Group): GroupDTO => {
    return {
      id: group ? group.id : null,
      title: values.title,
      color: values.color,
      imageFilename: values.imageFilename,
      imageContent: values.imageContent,
    };
  };
}
