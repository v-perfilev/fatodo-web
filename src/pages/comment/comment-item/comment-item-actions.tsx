import React, {FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Comment} from '../../../models/comment.model';
import {commentItemActionsStyles} from './_styles';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import CommentService from '../../../services/comment.service';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenu} from '../../../components/surfaces';
import {ReactionsIcon} from '../../../components/icons/reactions-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {useCommentDialogContext} from '../../../shared/contexts/dialog-contexts/comment-dialog-context';
import {EditIcon} from '../../../components/icons/edit-icon';

type Props = {
  comment: Comment;
  isOwnComment?: boolean;
};

const CommentItemActions: FC<Props> = ({comment, isOwnComment}: Props) => {
  const classes = commentItemActionsStyles();
  const {handleResponse} = useSnackContext();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();
  const {showCommentReactionsDialog, showCommentEditDialog} = useCommentDialogContext();
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

  const openEditDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showCommentEditDialog(comment);
      handleClose(e);
    },
    [comment]
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
          <MenuItem onClick={openEditDialog}>
            <EditIcon color="primary" />
            {t('comment:comment.actions.edit')}
          </MenuItem>
        )}
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

export default CommentItemActions;
