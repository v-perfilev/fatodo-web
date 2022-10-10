import {ItemViewContext} from '../../contexts/view-contexts/item-view-context';
import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import ItemService from '../../../services/item.service';
import {ResponseUtils} from '../../utils/response.utils';
import {Item} from '../../../models/item.model';

const withItemView = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState<boolean>(false);

  const load = (itemId: string, notFoundAction?: () => void, failedAction?: () => void): void => {
    setLoading(true);
    ItemService.getItem(itemId)
      .then((response) => {
        setItem(response.data);
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

  const context = {item, setItem, load, loading};

  return (
    <ItemViewContext.Provider value={context}>
      <Component {...props} />
    </ItemViewContext.Provider>
  );
};

export default withItemView;
