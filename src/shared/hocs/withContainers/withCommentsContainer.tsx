import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {ColorScheme} from '../../themes/colors';
import {useNavigate, useParams} from 'react-router-dom';

export type WithCommentsProps = {
  targetId: string;
  loading: boolean;
  colorScheme: ColorScheme;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const stateTargetId = useAppSelector(CommentsSelectors.targetId);
  const {targetId, colorScheme} = useParams();
  const navigate = useNavigate();

  const canLoad = targetId !== stateTargetId;
  const wrongRoute = !targetId;
  const loadingFinished = targetId === stateTargetId;

  const goBack = (): void => navigate(-1);

  const loadComments = (): void => {
    dispatch(CommentsActions.init(targetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId: targetId, offset: 0}))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canLoad) {
      loadComments();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return <Component loading={!loadingFinished} targetId={targetId} colorScheme={colorScheme} {...props} />;
};

export default withCommentsContainer;
