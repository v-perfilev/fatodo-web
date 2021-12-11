import React, {FC, useState} from 'react';
import {Item, ItemStatusType} from '../../../models/item.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useArchivedItemListContext} from '../../../shared/contexts/list-contexts/archived-item-list-context';
import {StatusView} from '../../../components/views/status-view';
import {StatusSelect} from '../../../components/inputs/status-select/status-select';
import ItemService from '../../../services/item.service';

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemStatus: FC<Props> = ({item, canEdit}: Props) => {
  const {handleResponse} = useSnackContext();
  const {updateItem: updateActive} = useItemListContext();
  const {updateItem: updateArchived} = useArchivedItemListContext();
  const [loading, setLoading] = useState<boolean>(false);

  const updateItem = item.archived ? updateArchived : updateActive;

  const updateStatus = (status: ItemStatusType): void => {
    setLoading(true);
    ItemService.updateItemStatus(item.id, status)
      .then(() => {
        const updatedItem = {...item, status};
        updateItem(updatedItem);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const statusInput = <StatusSelect statusType={item.status} setStatusType={updateStatus} loading={loading} />;
  const statusView = <StatusView statusType={item.status} />;

  return canEdit ? statusInput : statusView;
};

export default GroupViewItemStatus;
