import React, {useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import CommentListItem from './commentListItem/CommentListItem';
import {Comment} from '../../../models/Comment';
import {Box, SxProps} from '@mui/material';
import {COMMENTS_FOOTER_HEIGHT, COMMENTS_HEADER_HEIGHT} from '../../../constants';

type CommentListContentType = {
  setReference: (comment: Comment) => void;
};

const CommentListContent = ({setReference}: CommentListContentType) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<VirtualizedListMethods>();
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const comments = useAppSelector(CommentsSelectors.comments);
  const allLoaded = useAppSelector(CommentsSelectors.allLoaded);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);

  /*
  loaders
   */

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
      <PageContent disableGutters>
        <CommentListItem comment={comment} setReference={setReference} />
      </PageContent>
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollDown = (): void => listRef.current.scrollToBottom();

  return (
    <Box sx={listStyles}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        itemData={comments}
        allLoaded={allLoaded}
        loadMoreItems={load}
        reverseOrder
        paddingTop={8}
        paddingBottom={8}
        setIsOnBottom={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollDown} down />
    </Box>
  );
};

const listStyles: SxProps = {
  width: '100%',
  height: `calc(100% - ${COMMENTS_HEADER_HEIGHT}px - ${COMMENTS_FOOTER_HEIGHT}px)`,
};

export default CommentListContent;
