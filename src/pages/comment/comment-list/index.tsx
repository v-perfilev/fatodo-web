import React, {FC, useCallback, useEffect, useState} from 'react';
import CommentService from '../../../services/comment.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {Comment} from '../../../models/comment.model';
import {PageableList} from '../../../models/pageable-list.model';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import CommentContainer from './comment-container';
import {CommentItem} from '../types';
import {User} from '../../../models/user.model';

type Props = {
  targetId: string;
  account: User;
};

class CommentItemFactory {
  public static createComment = (id: string, comment: Comment): CommentItem => {
    return {id, type: 'comment', comment};
  };

  public static createButton = (parentId?: string): CommentItem => {
    return {id: 'button', type: 'button', parentId};
  };

  public static createStub = (): CommentItem => {
    return {id: 'stub', type: 'stub'};
  };
}

const CommentList: FC<Props> = ({targetId, account}: Props) => {
  const {handleResponse} = useSnackContext();
  const [comments, setComments] = useState<PageableList<Comment>>();
  const [items, setItems] = useState<CommentItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState<string[]>([targetId]);

  // CONVERTER

  const convertCommentsToItems = useCallback((commentsToConvert: PageableList<Comment>): CommentItem[] => {
    const handledItems = [] as CommentItem[];
    const parents = commentsToConvert.data;
    if (parents.length === 0) {
      handledItems.push(CommentItemFactory.createStub());
    } else {
      parents.forEach((parent) => {
        // parent comment
        handledItems.push(CommentItemFactory.createComment(parent.id, parent));
        const children = parent.children;
        if (children.data.length > 0) {
          // children load button
          if (children.data.length < children.count) {
            handledItems.push(CommentItemFactory.createButton(parent.id));
          }
          // child comments
          children.data.forEach((child) => {
            handledItems.push(CommentItemFactory.createComment(child.id, child));
          });
        }
      });
      // parents load button
      if (parents.length < commentsToConvert.count) {
        handledItems.push(CommentItemFactory.createButton());
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
    setItemsLoading((prevState) => {
      if (!prevState.includes(id)) {
        prevState.push(id);
      }
      return [...prevState];
    });
  };

  const removeLoading = (id: string): void => {
    setItemsLoading((prevState) => {
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
      CommentService.getAllParentsPageable(targetId, comments?.data.length || 0)
        .then((response) => {
          const newComments = response.data;
          const updateFunc = parentCommentInserter(newComments);
          updateCommentsAndItems(updateFunc);
          resolve();
        })
        .catch((response) => {
          if (response.status === 404) {
            resolve();
          } else {
            handleResponse(response);
            reject();
          }
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
        CommentService.getAllChildrenPageable(parentId, parent?.children.data.length || 0)
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
    if (comments) {
      const itemsWithUpdatedLoadings = convertCommentsToItems(comments);
      setItems(itemsWithUpdatedLoadings);
    }
  }, [itemsLoading]);

  // RENDERERS

  return (
    <CommentContainer
      items={items}
      loadMoreItems={loadMoreParentComments}
      loadMoreChildren={loadMoreChildComments}
      account={account}
    />
  );
};

export default CommentList;
