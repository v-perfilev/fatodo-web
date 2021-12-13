import React, {FC, MouseEvent, useCallback, useRef, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {Comment} from '../../../models/comment.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import CommentService from '../../../services/comment.service';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenu, PopupMenuItem, PopupMenuItemProps} from '../../../components/surfaces';
import {ReactionsIcon} from '../../../components/icons/reactions-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {useCommentDialogContext} from '../../../shared/contexts/dialog-contexts/comment-dialog-context';
import {EditIcon} from '../../../components/icons/edit-icon';
import {ReplyIcon} from '../../../components/icons/reply-icon';

type Props = {
  comment: Comment;
  isOwnComment?: boolean;
  setReference: (comment: Comment) => void;
};

const CommentItemActions: FC<Props> = ({comment, isOwnComment, setReference}: Props) => {
  const {handleResponse} = useSnackContext();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const ref = useRef();
  const {showCommentReactionsDialog, showCommentEditDialog} = useCommentDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const replyToComment = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      setReference(comment);
      handleClose(e);
    },
    [comment]
  );

  const openReactionsDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showCommentReactionsDialog(comment, users);
      handleClose(e);
    },
    [comment, users, showCommentReactionsDialog]
  );

  const openEditDialog = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      showCommentEditDialog(comment);
      handleClose(e);
    },
    [comment, showCommentEditDialog]
  );

  const deleteMessage = useCallback(
    (e: MouseEvent<HTMLElement>): void => {
      CommentService.deleteComment(comment.id).catch((response) => {
        handleResponse(response);
      });
      handleClose(e);
    },
    [comment, handleResponse]
  );

  const menuItems = [
    {action: replyToComment, icon: <ReplyIcon color="primary" />, text: t('comment:comment.buttons.response')},
    {
      action: openReactionsDialog,
      icon: <ReactionsIcon color="primary" />,
      text: t('comment:comment.actions.reactions'),
    },
    {
      action: openEditDialog,
      icon: <EditIcon color="primary" />,
      text: t('comment:comment.actions.edit'),
      show: isOwnComment && !comment.isDeleted,
    },
    {
      action: deleteMessage,
      icon: <DeleteIcon color="error" />,
      text: t('comment:comment.actions.delete'),
      show: isOwnComment && !comment.isDeleted,
    },
  ] as PopupMenuItemProps[];

  return (
    <>
      <IconButton onClick={handleOpen} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <Box>
          {menuItems.map((item, index) => (
            <PopupMenuItem action={item.action} icon={item.icon} text={item.text} show={item.show} key={index} />
          ))}
        </Box>
      </PopupMenu>
    </>
  );
};

export default CommentItemActions;
