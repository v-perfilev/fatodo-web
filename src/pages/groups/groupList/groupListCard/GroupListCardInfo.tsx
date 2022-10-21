import React, {memo, useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {useTranslation} from 'react-i18next';
import ItemsIcon from '../../../../components/icons/ItemsIcon';
import {Group} from '../../../../models/Group';
import FHStack from '../../../../components/boxes/FHStack';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {Button} from '@mui/material';
import BoxWithIcon from '../../../../components/boxes/BoxWithIcon';
import GroupListCardAvatars from './GroupListCardAvatars';

type GroupListCardHeaderProps = {
  group: Group;
  items: Item[];
  itemsCount: number;
};

const GroupListCardInfo = ({group, items, itemsCount}: GroupListCardHeaderProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, group.id));
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goToGroupView = (): void => navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group.id));

  const showButtonToGroupView = itemsCount !== items.length;
  const showButtonToCreateItem = itemsCount === 0;

  return (
    <FHStack height="45px" px={2} mt={1}>
      <GroupListCardAvatars group={group} />
      <FHStack justifyContent="center">
        {showButtonToGroupView && (
          <Button variant="text" onClick={goToGroupView}>
            {t('group:actions.showAll')}
          </Button>
        )}
        {showButtonToCreateItem && (
          <Button variant="text" onClick={goToItemCreate}>
            {t('group:actions.createItem')}
          </Button>
        )}
      </FHStack>
      <FHStack>
        {showButtonToGroupView && (
          <Button variant="text" onClick={goToGroupView}>
            {t('group:actions.showAll')}
          </Button>
        )}
        {showButtonToCreateItem && (
          <Button variant="text" onClick={goToItemCreate}>
            {t('group:actions.createItem')}
          </Button>
        )}
      </FHStack>
      <FHStack flexGrow={0}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />} size="small" fontSize={13} color="grey.500">
          {itemsCount || 0}
        </BoxWithIcon>
        <BoxWithIcon icon={<CommentsIcon color="primary" />} size="small" fontSize={13} color="grey.500">
          {commentThread?.count || 0}
        </BoxWithIcon>
      </FHStack>
    </FHStack>
  );
};

export default memo(GroupListCardInfo);
