import React, {memo, useMemo} from 'react';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../../skeletons/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupItem from '../../components/groupItem/GroupItem';
import {Group} from '../../../../models/Group';
import FVStack from '../../../../components/boxes/FVStack';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import PageDivider from '../../../../components/layouts/PageDivider';
import ConditionalLoader from '../../../../components/layouts/ConditionalSpinner';

type GroupListCardContentProps = {
  group: Group;
  items: Item[];
  itemsCount: number;
  loading: boolean;
};

const GroupListCardContent = ({group, items, itemsCount, loading}: GroupListCardContentProps) => {
  const account = useAppSelector(AuthSelectors.account);

  const itemsToShow = useMemo<Item[]>(() => [...items].reverse().slice(0, 5), [items]);

  const canEdit = group && GroupUtils.canEdit(account, group);

  return (
    <ConditionalLoader loading={loading} loadingPlaceholder={<GroupListCardSkeleton />}>
      {itemsToShow.map((item, index) => (
        <FVStack spacing={0} key={index}>
          <GroupItem item={item} canEdit={canEdit} />
          <PageDivider />
        </FVStack>
      ))}
      <GroupListCardInfo group={group} items={items} itemsCount={itemsCount} />
    </ConditionalLoader>
  );
};

export default memo(GroupListCardContent);
