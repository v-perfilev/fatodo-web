import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useDelayedState} from '../../hooks/useDelayedState';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {ColorScheme} from '../../themes/colors';

export type WithCommentsProps = {
  targetId: string;
  loading: boolean;
  colorScheme: ColorScheme;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useDelayedState();
  // TODO read params from route
  const route = {params: {targetId: undefined as string, colorScheme: undefined as ColorScheme}};
  const routeTargetId = route.params.targetId;
  const routeColorScheme = route.params.colorScheme;
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const goBack = (): void => {
    // TODO go back
  };

  const loadComments = (): void => {
    dispatch(CommentsActions.init(routeTargetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId: routeTargetId, offset: 0}))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeTargetId && routeTargetId !== targetId) {
      loadComments();
    } else if (!routeTargetId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return <Component targetId={targetId} loading={loading} colorScheme={routeColorScheme} {...props} />;
};

export default withCommentsContainer;
