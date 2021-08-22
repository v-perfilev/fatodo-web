import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {User} from '../../../models/user.model';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import CommentReactionsDialog, {
  CommentReactionDialogProps,
  defaultCommentReactionDialogProps,
} from '../../../pages/comment/dialogs/comment-reactions-dialog';
import {Comment} from '../../../models/comment.model';
import {CommentDialogContext} from '../../contexts/dialog-contexts/comment-dialog-context';

enum CommentDialogs {
  REACTIONS = 'COMMENT_REACTIONS_DIALOG',
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
    [setDialogProps, updateDialogProps]
  );

  const initDialogs = (): void => {
    handleDialog(CommentDialogs.REACTIONS, CommentReactionsDialog, defaultCommentReactionDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showCommentReactionsDialog,
  };

  return (
    <CommentDialogContext.Provider value={context}>
      <Component {...props} />
    </CommentDialogContext.Provider>
  );
};

export default withCommentDialogs;
