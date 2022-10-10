import {GroupViewContext} from '../../contexts/view-contexts/group-view-context';
import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import {Group} from '../../../models/group.model';
import ItemService from '../../../services/item.service';
import {ResponseUtils} from '../../utils/response.utils';

const withGroupView = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(false);

  const load = (groupId: string, notFoundAction?: () => void, failedAction?: () => void): void => {
    setLoading(true);
    ItemService.getGroup(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404 && notFoundAction) {
          notFoundAction();
        }
        handleResponse(response);
        if (failedAction) {
          failedAction();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {group, setGroup, load, loading};

  return (
    <GroupViewContext.Provider value={context}>
      <Component {...props} />
    </GroupViewContext.Provider>
  );
};

export default withGroupView;
