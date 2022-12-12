import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Comment} from '../../../models/Comment';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import CommentListHeader from './CommentListHeader';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import PageContent from '../../../components/layouts/PageContent';
import CommentListItem from './commentListItem/CommentListItem';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import {DEFAULT_MARGIN, PAGE_FOOTER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import CommentListFooter from './CommentListFooter';
import CommentListSkeleton from '../skeletons/CommentListSkeleton';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

type CommentListProps = {
  targetId: string;
  toggleCollapsed?: () => void;
};

const CommentList = ({targetId, toggleCollapsed}: CommentListProps) => {
  const dispatch = useAppDispatch();
  const stateTargetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const [loading, setLoading] = useDelayedState(false);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listMethodsRef = useRef<VirtualizedListMethods>();
  const listRef = useRef<HTMLDivElement>();

  const canLoad = targetId && targetId !== stateTargetId;
  const contextLoading = !targetId || targetId !== stateTargetId;

  /*
  loaders
   */

  const initialLoad = (): void => {
    setLoading(true);
    dispatch(CommentsActions.init(targetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: 0})).finally(() => setLoading(false));
  };

  const load = useCallback(async (): Promise<void> => {
    await dispatch(CommentsActions.fetchCommentsThunk({targetId, offset: comments.length}));
  }, [targetId, comments.length]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return comments.length > 0 ? comments[index].id || comments[index].createdAt.toString() : undefined;
    },
    [comments],
  );

  const itemRenderer = useCallback(
    (comment: Comment) => (
      <PageContent maxWidth="md">
        <CommentListItem comment={comment} />
      </PageContent>
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollDown = (): void => listMethodsRef.current.scrollToBottom();

  useEffect(() => {
    canLoad && initialLoad();
  }, [targetId]);

  return (
    <>
      <CommentListHeader width={listRef.current?.clientWidth} toggleCollapsed={toggleCollapsed} />
      <ConditionalSpinner loading={loading || contextLoading} loadingPlaceholder={<CommentListSkeleton />}>
        <VirtualizedList
          itemRenderer={itemRenderer}
          keyExtractor={keyExtractor}
          itemData={comments}
          allLoaded={allLoaded}
          loadMoreItems={load}
          reverseOrder
          paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
          paddingBottom={PAGE_FOOTER_HEIGHT + DEFAULT_MARGIN}
          setIsOnBottom={setHideScrollButton}
          virtualizedListMethodsRef={listMethodsRef}
          virtualizedListRef={listRef}
        />
        <ScrollCornerButton show={!hideScrollButton} action={scrollDown} down bottomPadding={PAGE_FOOTER_HEIGHT} />
      </ConditionalSpinner>
      <CommentListFooter width={listRef.current?.clientWidth} />
    </>
  );
};

export default CommentList;
