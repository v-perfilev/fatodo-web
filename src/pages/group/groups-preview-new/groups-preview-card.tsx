import * as React from 'react';
import {FC, memo, useEffect, useMemo} from 'react';
import {Accordion, Box, ThemeProvider} from '@material-ui/core';
import {Group} from '../../../models/group.model';
import {flowRight} from 'lodash';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {groupsPreviewCardStyles} from './_styles';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {Item} from '../../../models/item.model';
import {ThemeFactory} from '../../../shared/theme/theme';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import GroupsPreviewCardContent from './groups-preview-card-content';
import GroupsPreviewCardHeader from './groups-preview-card-header';

type Props = AuthState & {
  group: Group;
};

const GroupsPreviewCard: FC<Props> = ({account, group}: Props) => {
  const classes = groupsPreviewCardStyles();
  const {group: contextGroup, setGroup} = useGroupViewContext();
  const {handleUserIds} = useUserListContext();
  const {items: previewItems, counts: previewCounts} = usePreviewItemListContext();

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

  const count = useMemo<number>(() => {
    return group && previewCounts.has(group.id) ? previewCounts.get(group.id) : 0;
  }, [group, previewCounts]);

  const loadGroupUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  };

  useEffect(() => {
    if (group) {
      setGroup(group);
      loadGroupUsers();
    }
  }, [group]);

  useEffect(() => {
    if (items) {
      loadItemsUsers();
    }
  }, [items]);

  const theme = ThemeFactory.getTheme(group?.color);

  return (
    contextGroup && (
      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <Accordion className={classes.accordion} elevation={2} defaultExpanded expanded={true}>
            <GroupsPreviewCardHeader account={account} />
            <GroupsPreviewCardContent items={items} count={count} />
          </Accordion>
        </Box>
      </ThemeProvider>
    )
  );
};

export default flowRight([withAuthState, withGroupView, withItemList, withUserList, memo])(GroupsPreviewCard);
