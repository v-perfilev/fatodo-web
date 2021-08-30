import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../../components/dialogs/form-dialog';
import CommentEditForm from './comment-edit-form';
import {Comment} from '../../../../models/comment.model';

export type CommentEditDialogProps = {
  comment: Comment;
  show: boolean;
  close: () => void;
};

export const defaultCommentEditDialogProps: Readonly<CommentEditDialogProps> = {
  comment: null,
  show: false,
  close: (): void => undefined,
};

type Props = CommentEditDialogProps;

const CommentEditDialog: FC<Props> = ({comment, show, close}: Props) => {
  const {t} = useTranslation();

  const params = {comment};

  return (
    <FormDialog
      show={show}
      close={close}
      FormComponent={CommentEditForm}
      title={t('comment:editComment.title')}
      sendText={t('comment:editComment.send')}
      cancelText={t('comment:editComment.cancel')}
      params={params}
    />
  );
};

export default CommentEditDialog;
