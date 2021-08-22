import React, {FC, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {Comment} from '../../../models/comment.model';
import {commentCommentStyles} from './_styles';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {CommentUtils} from '../../../shared/utils/comment.utils';
import {UrlPic} from '../../../components/images';
import {useTranslation} from 'react-i18next';
import CommentCommentReactions from './comment-comment-reactions';
import CommentCommentActions from './comment-comment-actions';
import csx from 'classnames';

type Props = {
  comment: Comment;
  account: User;
};

const CommentComment: FC<Props> = ({comment, account}: Props) => {
  const classes = commentCommentStyles();
  const {t} = useTranslation();
  const {users} = useUserListContext();

  const user = useMemo((): User => {
    return CommentUtils.extractUserFromComment(users, comment);
  }, [users, comment]);

  const date = useMemo((): string => {
    return DateFormatters.formatTime(new Date(comment.createdAt));
  }, [comment.createdAt]);

  const isOwnMessage = useMemo((): boolean => {
    return CommentUtils.isOwnComment(comment, account);
  }, [comment, account]);

  const isChild = useMemo((): boolean => {
    return !!comment.parentId;
  }, [comment]);

  const classNames = csx(classes.root, {[classes.child]: isChild});

  return (
    <Box className={classNames}>
      <Box className={classes.header}>
        <UrlPic className={classes.image} alt={user?.username} url={user?.imageFilename} size="sm" border={1} />
        <Box className={classes.name}>{user?.username}</Box>
        <Box className={classes.date}>{date}</Box>
        <CommentCommentActions comment={comment} isOwnComment={isOwnMessage} />
      </Box>
      <Box className={classes.body}>
        {!comment.isDeleted && <span>{comment.text}</span>}
        {comment.isDeleted && <span className={classes.deleted}>{t('comment:comment.deleted')}</span>}
      </Box>
      <Box className={classes.footer}>
        <CommentCommentReactions comment={comment} account={account} />
      </Box>
    </Box>
  );
};

export default CommentComment;
