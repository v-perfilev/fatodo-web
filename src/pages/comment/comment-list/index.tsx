import React, {FC, useCallback, useEffect, useState} from 'react';
import CommentService from '../../../services/comment.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {Comment} from '../../../models/comment.model';
import {PageableList} from '../../../models/pageable-list.model';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import {CircularSpinner} from '../../../components/loaders';
import CommentContainer from './comment-container';
import {CommentItem} from '../types';
import {User} from '../../../models/user.model';

type Props = {
  targetId: string;
  account: User;
};

const CommentList: FC<Props> = ({targetId, account}: Props) => {
  const {handleResponse} = useSnackContext();
  const [comments, setComments] = useState<PageableList<Comment>>();
  const [items, setItems] = useState<CommentItem[]>();
  const [loading, setLoading] = useState<string[]>([targetId]);

  const convertCommentsToItems = useCallback((commentsToConvert: PageableList<Comment>): CommentItem[] => {
    const handledItems = [] as CommentItem[];
    const parents = commentsToConvert.data;
    if (parents.length === 0) {
      handledItems.push({id: 'parentStub', type: 'parentStub'});
    } else {
      parents.forEach((parent) => {
        handledItems.push({id: parent.id, type: 'parent', comment: parent});
        const children = parent.children;
        if (children.data.length > 0) {
          children.data.forEach((child) => {
            handledItems.push({id: child.id, type: 'child', comment: child});
          });
          if (loading.includes(parent.id)) {
            handledItems.push({id: 'loader', type: 'loader'});
          } else if (children.data.length < children.count) {
            handledItems.push({id: 'loadChildrenButton', type: 'loadChildrenButton', parentId: parent.id});
          }
        } else {
          handledItems.push({id: 'childStub', type: 'childStub'});
        }
      });
      if (loading.includes(targetId)) {
        handledItems.push({id: 'loader', type: 'loader'});
      } else if (parents.length < commentsToConvert.count) {
        handledItems.push({id: 'loadParentsButton', type: 'loadParentsButton'});
      }
    }
    return handledItems;
  }, []);

  // UPDATERS

  const updateCommentsAndItems = useCallback(
    (updateFunc: (prevState: PageableList<Comment>) => PageableList<Comment>): void => {
      const combinedComments = updateFunc(comments);
      const combinedItems = convertCommentsToItems(combinedComments);
      setComments(combinedComments);
      setItems(combinedItems);
    },
    [comments, items]
  );

  const parentCommentInserter = useCallback(
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

  const childCommentInserter = useCallback(
    (parentId: string, newComments: PageableList<Comment>) => (
      prevState: PageableList<Comment>
    ): PageableList<Comment> => {
      const commentList = prevState.data;
      const parentInList = prevState.data.find((c) => c.id === parentId);
      if (parentInList) {
        const index = commentList.indexOf(parentInList);
        const combinedComments = [...newComments.data, ...parentInList.children.data];
        const filteredComments = combinedComments
          .filter(ArrayUtils.withIdFilter)
          .filter(ArrayUtils.uniqueByIdFilter)
          .sort(ArrayUtils.createdAtDescComparator);
        prevState[index] = {
          data: filteredComments,
          count: newComments.count,
        };
      }
      return {
        data: commentList,
        count: prevState.count,
      };
    },
    []
  );

  // LOADERS

  const addLoading = (id: string): void => {
    setLoading((prevState) => {
      if (!prevState.includes(id)) {
        prevState.push(id);
      }
      return [...prevState];
    });
  };

  const removeLoading = (id: string): void => {
    setLoading((prevState) => {
      const index = prevState.indexOf(id, 0);
      if (index > -1) {
        prevState.splice(index, 1);
      }
      return [...prevState];
    });
  };

  const loadMoreParentComments = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      addLoading(targetId);
      CommentService.getAllParentsPageable(targetId, comments.data.length)
        .then((response) => {
          const newComments = response.data;
          const updateFunc = parentCommentInserter(newComments);
          updateCommentsAndItems(updateFunc);
          resolve();
        })
        .catch((response) => {
          handleResponse(response);
          reject();
        })
        .finally(() => {
          removeLoading(targetId);
        });
    });
  }, [comments, items]);

  const loadMoreChildComments = useCallback(
    (parentId: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        addLoading(parentId);
        const parent = comments.data.find((c) => c.id === parentId);
        const childrenLength = parent?.children.data.length || 0;
        CommentService.getAllChildrenPageable(parentId, childrenLength)
          .then((response) => {
            const newComments = response.data;
            const updateFunc = childCommentInserter(parentId, newComments);
            updateCommentsAndItems(updateFunc);
            resolve();
          })
          .catch((response) => {
            handleResponse(response);
            reject();
          })
          .finally(() => {
            removeLoading(parentId);
          });
      });
    },
    [comments, items]
  );

  // EFFECTS

  useEffect(() => {
    loadMoreParentComments().finally();
  }, [targetId]);

  useEffect(() => {
    const itemsWithUpdatedLoadings = convertCommentsToItems(comments);
    setItems(itemsWithUpdatedLoadings);
  }, [loading]);

  // RENDERERS

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <CommentContainer
      items={items}
      loadMoreItems={loadMoreParentComments}
      loadMoreChildren={loadMoreChildComments}
      account={account}
    />
  );
};

export default CommentList;
