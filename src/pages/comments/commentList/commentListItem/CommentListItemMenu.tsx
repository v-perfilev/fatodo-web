import React from 'react';
import {useTranslation} from 'react-i18next';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import ReactionsIcon from '../../../../components/icons/ReactionsIcon';
import {Comment} from '../../../../models/Comment';
import PageMenu, {PageMenuItem} from '../../../../components/layouts/PageMenu';
import {useCommentDialogContext} from '../../../../shared/contexts/dialogContexts/CommentDialogContext';

type CommentListItemMenuProps = {
  comment: Comment;
  isOwnComment: boolean;
};

const CommentListItemMenu = ({comment, isOwnComment}: CommentListItemMenuProps) => {
  const {t} = useTranslation();
  const {showCommentReactionsDialog, showCommentEditDialog, showCommentDeleteDialog} = useCommentDialogContext();

  const openReactionsDialog = (): void => {
    showCommentReactionsDialog(comment);
  };

  const editComment = (): void => {
    showCommentEditDialog(comment);
  };

  const deleteComment = (): void => {
    showCommentDeleteDialog(comment);
  };

  const menuItems: PageMenuItem[] = [
    {
      action: openReactionsDialog,
      text: t('comment:comment.actions.reactions'),
      icon: <ReactionsIcon />,
      color: 'primary',
    },
    {
      action: editComment,
      text: t('comment:comment.actions.edit'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: !isOwnComment || comment.isDeleted,
    },
    {
      action: deleteComment,
      icon: <DeleteIcon />,
      color: 'error',
      text: t('comment:comment.actions.delete'),
      hidden: !isOwnComment || comment.isDeleted,
    },
  ];

  return <PageMenu items={menuItems} compactView />;
};

export default CommentListItemMenu;
