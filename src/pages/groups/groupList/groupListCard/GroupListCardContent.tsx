import React, {memo} from 'react';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../../components/skeletons/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupItem from '../../components/groupItem/GroupItem';
import {Group} from '../../../../models/Group';
import FVStack from '../../../../components/boxes/FVStack';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import PageDivider from '../../../../components/layouts/PageDivider';

type GroupListCardContentProps = {
  group: Group;
  items: Item[];
  itemsCount: number;
  loading: boolean;
};

const GroupListCardContent = ({group, items, itemsCount, loading}: GroupListCardContentProps) => {
  const account = useAppSelector(AuthSelectors.account);

  const canEdit = group && GroupUtils.canEdit(account, group);

  return (
    <FVStack spacing={0}>
      {loading && <GroupListCardSkeleton />}
      {!loading &&
        items.slice(0, 5).map((item, index) => (
          <FVStack spacing={0} key={index}>
            <GroupItem item={item} canEdit={canEdit} />
            <PageDivider />
          </FVStack>
        ))}
      {!loading && <GroupListCardInfo group={group} items={items} itemsCount={itemsCount} />}
    </FVStack>
  );
};

export default memo(GroupListCardContent);
