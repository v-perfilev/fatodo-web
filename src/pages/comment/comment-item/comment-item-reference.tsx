import React, {FC, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {ReferenceComment} from '../../../models/comment.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {CommentUtils} from '../../../shared/utils/comment.utils';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {commentItemReferenceStyles} from './_styles';

type Props = {
  reference: ReferenceComment;
};

const CommentItemReference: FC<Props> = ({reference}: Props) => {
  const classes = commentItemReferenceStyles();
  const {t} = useTranslation();
  const {users} = useUserListContext();

  const user = useMemo((): User => {
    return CommentUtils.extractUserFromComment(users, reference);
  }, [users, reference]);

  const date = useMemo((): string => {
    return DateFormatters.formatTime(new Date(reference.createdAt));
  }, [reference.createdAt]);

  return (
    !!reference && (
      <Box className={classes.root}>
        {t('comment:control.reference')}:{user.username},{date}
      </Box>
    )
  );
};

export default CommentItemReference;
