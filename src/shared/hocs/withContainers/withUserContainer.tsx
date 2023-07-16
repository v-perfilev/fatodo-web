import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {User} from '../../../models/User';
import UserSelectors from '../../../store/user/userSelectors';
import {UserActions} from '../../../store/user/userActions';

export type WithUserProps = {
  user?: User;
  loading: boolean;
};

export type UserContainerProps = {
  userId?: string;
};

const withUserContainer = (Component: ComponentType<WithUserProps & UserContainerProps>) => ({
  userId,
}: UserContainerProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(UserSelectors.user);

  const canLoad = userId && userId !== user?.id;
  const loadingFinished = userId === user?.id;

  const loadUser = (): void => {
    dispatch(UserActions.fetchUserThunk(userId));
  };

  useEffect(() => {
    canLoad && loadUser();
  }, [userId]);

  return <Component loading={!loadingFinished} user={user} />;
};

export default withUserContainer;
