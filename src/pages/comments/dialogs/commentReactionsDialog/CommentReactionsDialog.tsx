import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {Comment, CommentReaction} from '../../../../models/Comment';
import CommentReactionsDialogItem from './CommentReactionsDialogItem';
import {Typography} from '@mui/material';

type CommentReactionWithUser = {
  reaction: CommentReaction;
  user?: User;
};

export type CommentReactionsDialogProps = {
  comment: Comment;
  show: boolean;
  close: () => void;
};

export const defaultCommentReactionsDialogProps: Readonly<CommentReactionsDialogProps> = {
  comment: null,
  show: false,
  close: (): void => null,
};

const CommentReactionsDialog = ({comment, show, close}: CommentReactionsDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const reactionUserIds = useMemo(() => comment?.reactions.map((r) => r.userId), []);
  const users: User[] = useAppSelector((state) => usersSelector(state, reactionUserIds));
  const {t} = useTranslation();
  const [reactions, setReactions] = useState<CommentReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<CommentReactionWithUser[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(value));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const updatedList = comment.reactions.map((reaction) => ({
      reaction,
      user: users.find((u) => u.id === reaction.userId),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (comment && users) {
      combineUsersWithReactions();
    }
  }, [comment?.reactions, users]);

  const content = (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} />
      {reactionsToShow.length > 0 && (
        <FVStack>
          {reactionsToShow.map((reaction) => (
            <CommentReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
          ))}
        </FVStack>
      )}
      {reactions.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('comment:reactions.reactionsNotFound')}
          </Typography>
        </FCenter>
      )}
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('comment:reactions.title')} content={content} />;
};

export default memo(CommentReactionsDialog);
