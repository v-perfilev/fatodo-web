import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {User} from '../../../models/user.model';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import CommentReactionsDialog, {
  CommentReactionDialogProps,
  defaultCommentReactionDialogProps,
} from '../../../pages/comment/dialogs/comment-reactions-dialog/comment-reactions-dialog';
import {Comment} from '../../../models/comment.model';
import {CommentDialogContext} from '../../contexts/dialog-contexts/comment-dialog-context';
import CommentEditDialog, {
  CommentEditDialogProps,
  defaultCommentEditDialogProps,
} from '../../../pages/comment/dialogs/comment-edit-dialog/comment-edit-dialog';

enum CommentDialogs {
  REACTIONS = 'COMMENT_REACTIONS_DIALOG',
  EDIT = 'COMMENT_EDIT',
}

const withCommentDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, updateDialogProps} = useDialogContext();

  const showCommentReactionsDialog = useCallback(
    (comment: Comment, users: User[]): void => {
      const show = true;
      const close = (): void => updateDialogProps(CommentDialogs.REACTIONS, {show: false});
      const props = {comment, users, show, close} as CommentReactionDialogProps;
      setDialogProps(CommentDialogs.REACTIONS, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showCommentEditDialog = useCallback(
    (comment: Comment): void => {
      const show = true;
      const close = (): void => updateDialogProps(CommentDialogs.EDIT, {show: false});
      const props = {comment, show, close} as CommentEditDialogProps;
      setDialogProps(CommentDialogs.EDIT, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const initDialogs = (): void => {
    handleDialog(CommentDialogs.REACTIONS, CommentReactionsDialog, defaultCommentReactionDialogProps);
    handleDialog(CommentDialogs.EDIT, CommentEditDialog, defaultCommentEditDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showCommentReactionsDialog,
    showCommentEditDialog,
  };

  return (
    <CommentDialogContext.Provider value={context}>
      <Component {...props} />
    </CommentDialogContext.Provider>
  );
};

export default withCommentDialogs;
