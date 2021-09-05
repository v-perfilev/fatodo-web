import React, {FC, memo, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {Comment} from '../../../models/comment.model';
import {commentItemStyles} from './_styles';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {CommentUtils} from '../../../shared/utils/comment.utils';
import {UrlPic} from '../../../components/images';
import {useTranslation} from 'react-i18next';
import CommentItemReactions from './comment-item-reactions';
import CommentItemActions from './comment-item-actions';
import CommentItemReferenceButton from './comment-item-reference-button';
import CommentItemReference from './comment-item-reference';

type Props = {
  comment: Comment;
  account: User;
  setReference: (comment: Comment) => void;
};

const CommentItem: FC<Props> = ({comment, account, setReference}: Props) => {
  const classes = commentItemStyles();
  const {t} = useTranslation();
  const {users} = useUserListContext();

  const user = useMemo((): User => {
    return CommentUtils.extractUserFromComment(users, comment);
  }, [users, comment]);

  const date = useMemo((): string => {
    return DateFormatters.formatTimeWithDate(new Date(comment.createdAt));
  }, [comment]);

  const isOwnMessage = useMemo((): boolean => {
    return CommentUtils.isOwnComment(comment, account);
  }, [comment, account]);

  return (
    <Box className={classes.root}>
      <Box className={classes.image}>
        <UrlPic alt={user?.username} url={user?.imageFilename} size="sm" border={1} />
      </Box>
      <Box className={classes.content}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user?.username}</Box>
          <Box className={classes.date}>{date}</Box>
          {comment.reference && <CommentItemReference reference={comment.reference} />}
          <Box className={classes.placeholder} />
          <CommentItemReferenceButton comment={comment} setReference={setReference} />
          <CommentItemActions comment={comment} isOwnComment={isOwnMessage} />
        </Box>
        <Box className={classes.body}>
          {!comment.isDeleted && <span>{comment.text}</span>}
          {comment.isDeleted && <span className={classes.deleted}>{t('comment:comment.deleted')}</span>}
        </Box>
        <Box className={classes.footer}>
          <CommentItemReactions comment={comment} account={account} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CommentItem);
