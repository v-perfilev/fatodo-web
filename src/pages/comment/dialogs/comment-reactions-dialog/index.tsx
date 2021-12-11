import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/modal-dialog/modal-dialog';
import {User} from '../../../../models/user.model';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import CommentReactionsDialogItem from './comment-reactions-dialog-item';
import {Comment, CommentReaction} from '../../../../models/comment.model';
import {commentReactionsDialogStyles} from './_styles';

export type CommentReactionDialogProps = {
  comment: Comment;
  users: User[];
  show: boolean;
  close: () => void;
};

export const defaultCommentReactionDialogProps: Readonly<CommentReactionDialogProps> = {
  comment: null,
  users: [],
  show: false,
  close: (): void => undefined,
};

type CommentReactionWithUser = {
  reaction: CommentReaction;
  user?: User;
};

type Props = CommentReactionDialogProps;

const CommentReactionsDialog: FC<Props> = ({comment, users, show, close}: Props) => {
  const classes = commentReactionsDialogStyles();
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<CommentReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<CommentReactionWithUser[]>([]);

  const filterReactionsToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(filter));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const userFilter = (userId: string) => (user: User): boolean => user.id === userId;
    const updatedList = comment.reactions.map((reaction) => ({
      reaction,
      user: users.find(userFilter(reaction.userId)),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (comment && users) {
      combineUsersWithReactions();
    }
  }, [comment?.reactions, users]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterReactionsToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {reactionsToShow.map((reaction) => (
        <CommentReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
      ))}
      {reactionsToShow.length === 0 && (
        <Box className={classes.notFound}>{t('comment:reactions.reactionsNotFound')}</Box>
      )}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  return (
    <ModalDialog isOpen={show} close={close} title={t('comment:reactions.title')} content={content} showCloseIcon />
  );
};

export default CommentReactionsDialog;
