import * as Yup from 'yup';
import i18n from '../../../../../shared/i18n';
import {Comment} from '../../../../../models/comment.model';
import {CommentDTO} from '../../../../../models/dto/comment.dto';

export interface CommentEditValues {
  text: string;
}

export const defaultCommentEditFormValues = (comment: Comment): Readonly<CommentEditValues> => ({
  text: comment?.text ? comment.text : '',
});

export class CommentEditFormUtils {
  public static mapPropsToValues = (comment: Comment): CommentEditValues => defaultCommentEditFormValues(comment);

  public static validationSchema = Yup.object().shape({
    text: Yup.string().required(() => i18n.t('comment:editComment.fields.text.required')),
  });

  public static mapValuesToDTO = (values: CommentEditValues): CommentDTO => ({
    text: values.text,
  });
}
