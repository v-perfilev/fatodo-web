import React, {Dispatch, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {CommentUtils} from '../../../../shared/utils/CommentUtils';
import {Comment} from '../../../../models/Comment';
import FHStack from '../../../../components/boxes/FHStack';
import UserView from '../../../../components/views/UserView';
import FVStack from '../../../../components/boxes/FVStack';
import CommentListItemReferenceButton from './CommentListItemReferenceButton';
import CommentListItemReactions from './CommentListItemReactions';
import CommentListItemMenu from './CommentListItemMenu';
import CommentListItemReference from './CommentListItemReference';
import DateView from '../../../../components/views/DateView';
import {Box, SxProps, Typography} from '@mui/material';

type CommentListItemProps = {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListItem = ({comment, setReference}: CommentListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const user = useAppSelector((state) => userSelector(state, comment.userId));

  const date = new Date(comment.createdAt);
  const isOwnComment = CommentUtils.isOwnComment(comment, account);
  const showReactions = !isOwnComment || comment.reactions.length > 0;

  return (
    <FHStack sx={containerStyles} alignItems="flex-start" spacing={1}>
      <Box marginTop={1}>{user && <UserView user={user} size={40} />}</Box>
      <FVStack sx={commentStyles} spacing={1}>
        <FHStack>
          <FHStack>
            <Typography color="primary" fontWeight="bold">
              {user?.username}
            </Typography>
          </FHStack>
          <Typography color="grey.400" fontWeight="bold" fontSize={12}>
            <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
          </Typography>
          <FHStack flexGrow={0} spacing={1}>
            <CommentListItemReferenceButton comment={comment} setReference={setReference} />
            <CommentListItemMenu comment={comment} isOwnComment={isOwnComment} setReference={setReference} />
          </FHStack>
        </FHStack>
        {comment.reference && <CommentListItemReference reference={comment.reference} />}
        {!comment.isDeleted && <Typography fontSize={14}>{comment.text}</Typography>}
        {comment.isDeleted && (
          <Typography color="grey.400" fontWeight="bold" fontSize={14}>
            {t('comment:comment.deleted')}
          </Typography>
        )}
      </FVStack>
      {showReactions && <CommentListItemReactions comment={comment} isOwnComment={isOwnComment} />}
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  paddingX: 1,
  paddingY: 1,
};

const commentStyles: SxProps = {
  flexGrow: 1,
  paddingLeft: 2,
  paddingRight: 1,
  paddingTop: 1,
  paddingBottom: 2,
  backgroundColor: 'grey.50',
  borderRadius: 3,
};

export default CommentListItem;
