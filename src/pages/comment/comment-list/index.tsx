import React, {FC, Ref, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import CommentService from '../../../services/comment.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {Comment, CommentReactions} from '../../../models/comment.model';
import {PageableList} from '../../../models/pageable-list.model';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import CommentContainer from './comment-container';
import {User} from '../../../models/user.model';
import CommentStub from './comment-stub';
import CommentLoadButton from './comment-load-button';
import {useWsCommentContext} from '../../../shared/contexts/comment-contexts/ws-comment-context';
import {NEW_COMMENT_PREFIX} from '../_constants';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {CircularSpinner} from '../../../components/loaders';
import CommentSkeletons from '../comment-skeletons/comment-skeletons';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

type Props = {
  targetId: string;
  account: User;
  setReference: (comment: Comment) => void;
  commentListRef?: Ref<CommentListMethods>;
};

export type CommentListMethods = {
  addComment: (comment: Comment) => void;
};

const CommentList: FC<Props> = ({targetId, account, setReference, commentListRef}: Props) => {
  const {commentNewEvent, commentUpdateEvent, commentReactionsEvent} = useWsCommentContext();
  const {handleResponse} = useSnackContext();
  const {handleUserIds} = useUserListContext();
  const [comments, setComments] = useState<PageableList<Comment>>({data: [], count: 0});
  const [initialLoading, setInitialLoading] = useLoadingState();
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);

  // UPDATERS

  const updateComments = useCallback(
    (updateFunc: (prevState: PageableList<Comment>) => PageableList<Comment>): void => {
      const combinedComments = updateFunc(comments);
      setComments(combinedComments);
    },
    [comments]
  );

  const filterComments = (comments: Comment[]): Comment[] =>
    comments
      .filter(ArrayUtils.withIdFilter)
      .filter(ArrayUtils.uniqueByIdFilter)
      .sort(ArrayUtils.createdAtDescComparator);

  const commentsInserter = useCallback(
    (newComments: PageableList<Comment>) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const combinedComments = [...prevState.data, ...newComments.data];
      const filteredComments = filterComments(combinedComments);
      return {
        data: filteredComments,
        count: newComments.count,
      };
    },
    []
  );

  const commentInserter = useCallback(
    (comment: Comment) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const prevList = prevState.data;
      const combinedComments = [...prevList, comment];
      const filteredComments = filterComments(combinedComments);
      return {
        data: filteredComments,
        count: prevState.count + 1,
      };
    },
    []
  );

  const ownCommentInserter = useCallback(
    (comment: Comment) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const prevList = prevState.data;
      const commentInList = prevList.find((c) => c.id.startsWith(NEW_COMMENT_PREFIX) && c.text === comment.text);
      if (commentInList) {
        ArrayUtils.deleteItem(prevList, commentInList);
      }
      const combinedComments = [...prevList, comment];
      const filteredComments = filterComments(combinedComments);
      return {
        data: filteredComments,
        count: commentInList ? prevState.count : prevState.count + 1,
      };
    },
    []
  );

  const commentUpdater = useCallback(
    (comment: Comment) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const prevList = prevState.data;
      const commentInList = prevList.find((c) => c.id === comment.id);
      if (commentInList) {
        const index = prevList.indexOf(commentInList);
        prevList[index] = comment;
      }
      return {
        data: prevList,
        count: prevState.count,
      };
    },
    []
  );

  const reactionsUpdater = useCallback(
    (reactions: CommentReactions) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const prevList = prevState.data;
      const commentInList = prevList.find((m) => m.id === reactions.commentId);
      if (commentInList) {
        const index = prevList.indexOf(commentInList);
        prevList[index].reactions = reactions.reactions;
      }
      return {
        data: prevList,
        count: prevState.count,
      };
    },
    []
  );

  // LOADERS

  const loadMoreItems = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      CommentService.getAllPageable(targetId, comments?.data.length || 0)
        .then((response) => {
          const userIds = response.data.data.map((comment) => comment.userId);
          handleUserIds(userIds);
          const updateFunc = commentsInserter(response.data);
          updateComments(updateFunc);
        })
        .catch((response) => {
          if (response.status !== 404) {
            handleResponse(response);
          }
        })
        .finally(() => {
          setLoading(false);
          resolve();
        });
    });
  }, [comments]);

  // IMPERATIVE HANDLERS

  const addComment = useCallback(
    (comment: Comment) => {
      handleUserIds([comment.userId]);
      const updateFunc = commentInserter(comment);
      updateComments(updateFunc);
    },
    [comments]
  );

  useImperativeHandle(
    commentListRef,
    (): CommentListMethods => ({
      addComment,
    }),
    [comments]
  );

  // EFFECTS

  useEffect(() => {
    loadMoreItems().finally(() => setInitialLoading(false));
  }, [targetId]);

  useEffect(() => {
    if (comments && comments.data.length === comments.count) {
      setAllLoaded(true);
    }
  }, [comments]);

  useEffect(() => {
    if (targetId === commentNewEvent?.targetId) {
      handleUserIds([commentNewEvent.userId]);
      const updateFunc =
        commentNewEvent.userId === account.id ? ownCommentInserter(commentNewEvent) : commentInserter(commentNewEvent);
      updateComments(updateFunc);
    }
  }, [commentNewEvent]);

  useEffect(() => {
    if (targetId === commentUpdateEvent?.targetId) {
      const updateFunc = commentUpdater(commentUpdateEvent);
      updateComments(updateFunc);
    }
  }, [commentUpdateEvent]);

  useEffect(() => {
    if (targetId === commentReactionsEvent?.targetId) {
      const updateFunc = reactionsUpdater(commentReactionsEvent);
      updateComments(updateFunc);
    }
  }, [commentReactionsEvent]);

  // RENDERERS

  return (
    <>
      {initialLoading && <CommentSkeletons />}
      {!initialLoading && comments?.data.length > 0 && (
        <CommentContainer comments={comments.data} account={account} setReference={setReference} />
      )}
      {!initialLoading && loading && <CircularSpinner size="sm" />}
      {!initialLoading && !loading && comments?.data.length == 0 && <CommentStub />}
      {!initialLoading && !loading && !allLoaded && comments.data.length > 0 && (
        <CommentLoadButton loadMoreItems={loadMoreItems} loading={loading} />
      )}
    </>
  );
};

export default CommentList;
