import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {User} from '../../../models/User';
import UserSelectors from '../../../store/user/userSelectors';
import {UserActions} from '../../../store/user/userActions';
import {useNavigate, useParams} from 'react-router-dom';

export type WithUserProps = {
  user?: User;
  loading: boolean;
};

const withUserContainer = (Component: ComponentType<WithUserProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(UserSelectors.user);
  const {userId} = useParams();
  const navigate = useNavigate();

  const canLoad = userId !== user?.id;
  const wrongRoute = !userId;
  const loadingFinished = userId === user?.id;

  const goBack = (): void => navigate(-1);

  const loadUser = (): void => {
    dispatch(UserActions.fetchUserThunk(userId))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canLoad) {
      loadUser();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return <Component loading={!loadingFinished} user={user} {...props} />;
};

export default withUserContainer;
