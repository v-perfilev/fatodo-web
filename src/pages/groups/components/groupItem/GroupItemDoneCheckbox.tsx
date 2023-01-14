import React, {useState} from 'react';
import Checkbox from '../../../../components/controls/Checkbox';
import {Item} from '../../../../models/Item';
import {ItemActions} from '../../../../store/item/itemActions';
import {useAppDispatch} from '../../../../store/store';

type GroupItemDoneCheckboxProps = {
  item: Item;
  canEdit?: boolean;
};

const GroupItemDoneCheckbox = ({item, canEdit}: GroupItemDoneCheckboxProps) => {
  const dispatch = useAppDispatch();
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const toggleStatus = (): void => {
    setStatusLoading(true);
    dispatch(ItemActions.updateItemStatusThunk(item))
      .unwrap()
      .finally(() => setStatusLoading(false));
  };

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    canEdit && toggleStatus();
  };

  return <Checkbox checked={item.done} size={30} loading={statusLoading} canNotEdit={!canEdit} onClick={handleClick} />;
};

export default GroupItemDoneCheckbox;
