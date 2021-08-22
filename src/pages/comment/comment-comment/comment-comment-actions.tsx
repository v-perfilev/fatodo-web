import React, {FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Comment} from '../../../models/comment.model';
import {commentCommentActionsStyles} from './_styles';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import CommentService from '../../../services/comment.service';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenu} from '../../../components/surfaces';
import {ReactionsIcon} from '../../../components/icons/reactions-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {useCommentDialogContext} from '../../../shared/contexts/dialog-contexts/comment-dialog-context';

type Props = {
  comment: Comment;
  isOwnComment?: boolean;
};

const CommentCommentActions: FC<Props> = ({comment, isOwnComment}: Props) => {
  const classes = commentCommentActionsStyles();
  const {handleResponse} = useSnackContext();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();
  const {showCommentReactionsDialog} = useCommentDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const openReactionsDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showCommentReactionsDialog(comment, users);
      handleClose(e);
    },
    [comment, users]
  );

  const deleteMessage = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      CommentService.deleteComment(comment.id).catch((response) => {
        handleResponse(response);
      });
      handleClose(e);
    },
    [comment]
  );

  return (
    <>
      <IconButton onClick={handleClickOnAction} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={openReactionsDialog}>
          <ReactionsIcon color="primary" />
          {t('comment:comment.actions.reactions')}
        </MenuItem>
        {isOwnComment && !comment.isDeleted && (
          <MenuItem onClick={deleteMessage}>
            <DeleteIcon color="error" />
            {t('comment:comment.actions.delete')}
          </MenuItem>
        )}
      </PopupMenu>
    </>
  );
};

export default CommentCommentActions;
