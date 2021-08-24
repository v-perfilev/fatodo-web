import React, {FC, useCallback, useEffect, useState} from 'react';
import CommentService from '../../../services/comment.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {Comment} from '../../../models/comment.model';
import {PageableList} from '../../../models/pageable-list.model';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import CommentContainer from './comment-container';
import {User} from '../../../models/user.model';

type Props = {
  targetId: string;
  account: User;
  setReference: (comment: Comment) => void;
};

const CommentList: FC<Props> = ({targetId, account, setReference}: Props) => {
  const {handleResponse} = useSnackContext();
  const [comments, setComments] = useState<PageableList<Comment>>();
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

  const commentInserter = useCallback(
    (newComments: PageableList<Comment>) => (prevState: PageableList<Comment>): PageableList<Comment> => {
      const combinedComments = [...newComments.data, ...prevState.data];
      const filteredComments = combinedComments
        .filter(ArrayUtils.withIdFilter)
        .filter(ArrayUtils.uniqueByIdFilter)
        .sort(ArrayUtils.createdAtComparator);
      return {
        data: filteredComments,
        count: newComments.count,
      };
    },
    []
  );

  // LOADERS

  const loadMoreParentComments = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      CommentService.getAllPageable(targetId, comments?.data.length || 0)
        .then((response) => {
          const updateFunc = commentInserter(response.data);
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

  // EFFECTS

  useEffect(() => {
    loadMoreParentComments().finally();
  }, [targetId]);

  useEffect(() => {
    if (comments && comments.data.length === comments.count) {
      setAllLoaded(true);
    }
  }, [comments]);

  // RENDERERS

  return (
    !loading && (
      <CommentContainer
        comments={comments.data}
        loadMoreItems={loadMoreParentComments}
        allLoaded={allLoaded}
        account={account}
        setReference={setReference}
      />
    )
  );
};

export default CommentList;
