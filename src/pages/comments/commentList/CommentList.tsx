import React, {useEffect, useState} from 'react';
import {Comment} from '../../../models/Comment';
import CommentListContent from './CommentListContent';
import CommentListFooter from './CommentListFooter';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import CommentListHeader from './CommentListHeader';

type CommentListProps = {
  targetId: string;
  toggleCollapsed?: () => void;
};

const CommentList = ({targetId, toggleCollapsed}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const stateTargetId = useAppSelector(CommentsSelectors.targetId);
  const [reference, setReference] = useState<Comment>();

  const canLoad = targetId && targetId !== stateTargetId;
  const loading = !targetId || targetId !== stateTargetId;

  const loadComments = (): void => {
    dispatch(CommentsActions.init(targetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: 0}));
  };

  useEffect(() => {
    canLoad && loadComments();
  }, [targetId]);

  return (
    <ConditionalSpinner loading={loading}>
      <CommentListHeader toggleCollapsed={toggleCollapsed} />
      <CommentListContent setReference={setReference} />
      <CommentListFooter reference={reference} setReference={setReference} />
    </ConditionalSpinner>
  );
};

export default CommentList;
