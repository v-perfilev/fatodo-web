import React, {FC, useCallback, useState} from 'react';
import {Box} from '@material-ui/core';
import {Message} from '../../../../models/message.model';
import ChatService from '../../../../services/chat.service';
import CommentService from '../../../../services/comment.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';

type Props = {
  targetId: string;
}

const CommentsList: FC<Props> = ({targetId}: Props) => {
  const {handleResponse} = useSnackContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // UPDATERS

  // LOADERS

  const loadMoreParentComments = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      CommentService.getAllParentsPageable(targetId, comments.length)
        .then((response) => {
          const newParentComments = response.data;
          if (newParentComments.length === 0) {
            setAllLoaded(true);
          } else {
            const updateFunc = messageInserter(...newParentComments);
            updateMessagesAndItems(updateFunc);
          }
          resolve();
        })
        .catch((response) => {
          handleResponse(response);
          reject();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [comments.length, items]);

  return (
    <Box>
      test
    </Box>
  );
};

export default CommentsList;
