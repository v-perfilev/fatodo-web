import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';
import {useNavigate, useParams} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {useDelayedState} from '../../hooks/useDelayedState';

export type WithGroupProps = {
  group?: Group;
  groupId: string;
  loading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const {groupId} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useDelayedState(groupId !== group?.id);

  const canLoad = groupId !== group?.id;
  const wrongRoute = !groupId;
  const loadingFinished = groupId === group?.id;

  const goBack = (): void => navigate(-1);
  const goToGroups = (): void => navigate(GroupRouteUtils.getListUrl());

  const loadGroup = (): void => {
    dispatch(GroupActions.fetchGroupThunk(groupId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (canLoad) {
      loadGroup();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  useEffect(() => {
    if (!group && !loading) {
      goToGroups();
    }
  }, [group]);

  return <Component loading={loading || !loadingFinished} group={group} groupId={groupId} {...props} />;
};

export default withGroupContainer;
