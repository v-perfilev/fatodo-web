import React, {ComponentType, useEffect} from 'react';
import {GroupActions} from '../../../store/group/groupActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {Group} from '../../../models/Group';
import {useNavigate, useParams} from 'react-router-dom';

export type WithGroupProps = {
  groupId: string;
  group?: Group;
  loading: boolean;
};

const withGroupContainer = (Component: ComponentType<WithGroupProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const {groupId} = useParams();
  const navigate = useNavigate();

  const canLoad = groupId !== group?.id;
  const wrongRoute = !groupId;
  const loadingFinished = groupId === group?.id;

  const goBack = (): void => navigate(-1);

  const loadGroup = (): void => {
    dispatch(GroupActions.fetchGroupThunk(groupId))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canLoad) {
      loadGroup();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return <Component loading={!loadingFinished} groupId={groupId} group={group} {...props} />;
};

export default withGroupContainer;
