import React, {FC, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {commentControlReferenceStyles} from './_styles';
import {Box, IconButton} from '@material-ui/core';
import {Comment} from '../../../models/comment.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {CommentUtils} from '../../../shared/utils/comment.utils';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {CloseIcon} from '../../../components/icons/close-icon';

type Props = {
  reference?: Comment;
  clearReference: () => void;
};

const CommentControlReference: FC<Props> = ({reference, clearReference}: Props) => {
  const classes = commentControlReferenceStyles();
  const {t} = useTranslation();
  const {users} = useUserListContext();

  const user = useMemo((): User => {
    return reference ? CommentUtils.extractUserFromComment(users, reference) : null;
  }, [users, reference]);

  const date = useMemo((): string => {
    return reference ? DateFormatters.formatTimeWithDate(new Date(reference.createdAt)) : null;
  }, [reference]);

  return (
    user &&
    date && (
      <Box className={classes.root}>
        <span className={classes.text}>
          {t('comment:control.reference')}: {user.username}, {date}
        </span>
        <IconButton className={classes.icon} onClick={clearReference} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
    )
  );
};

export default CommentControlReference;
