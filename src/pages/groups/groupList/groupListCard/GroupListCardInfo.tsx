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
  const goToComments = (): void => console.log('navigate comment list');

  const showButtonToGroupView = itemsCount !== items.length;
  const showButtonToCreateItem = itemsCount === 0;

  return (
    <FHStack height="45px" px={2} my={1}>
      {/*<GroupListCardAvatars group={group} />*/}
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
      <BoxWithIcon icon={<ItemsIcon color="primary" />}>{itemsCount || 0}</BoxWithIcon>
      <BoxWithIcon icon={<CommentsIcon color="primary" />} onClick={goToComments}>
        {commentThread?.count || 0}
      </BoxWithIcon>
    </FHStack>
  );
};

export default memo(GroupListCardInfo);
