import {GroupListContext} from '../../contexts/list-contexts/group-list-context';
import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import {Group} from '../../../models/group.model';
import ItemService from '../../../services/item.service';

const withGroupList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const load = (): void => {
    setLoading(true);
    ItemService.getAllGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {groups, load, loading};

  return (
    <GroupListContext.Provider value={context}>
      <Component {...props} />
    </GroupListContext.Provider>
  );
};

export default withGroupList;
