import React, {FC, useState} from 'react';
import {Item} from '../../../models/item.model';
import {useHistory} from 'react-router-dom';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useArchivedItemListContext} from '../../../shared/contexts/list-contexts/archived-item-list-context';

type Props = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemStatus: FC<Props> = ({item, canEdit}: Props) => {
  const history = useHistory();
  const {handleResponse} = useSnackContext();
  const {updateItem: updateActive} = useItemListContext();
  const {updateItem: updateArchived} = useArchivedItemListContext();
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  return <></>;
};

export default GroupViewItemStatus;
