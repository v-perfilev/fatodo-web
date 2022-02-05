import * as React from 'react';
import {FC, memo, useEffect, useMemo} from 'react';
import {Accordion, Box, ThemeProvider} from '@material-ui/core';
import {Group} from '../../../../models/group.model';
import {flowRight} from 'lodash';
import withGroupView from '../../../../shared/hocs/with-view/with-group-view';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {Item} from '../../../../models/item.model';
import {ThemeFactory} from '../../../../shared/theme/theme';
import withAuthState from '../../../../shared/hocs/with-auth-state/with-auth-state';
import withItemList from '../../../../shared/hocs/with-list/with-item-list';
import withUserList from '../../../../shared/hocs/with-list/with-user-list';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import GroupsPreviewCardContent from './group-list-card-content';
import GroupListCardHeader from './group-list-card-header';
import {groupListCardStyles} from './_styles';

type Props = AuthState & {
  group: Group;
};

const GroupListCard: FC<Props> = ({account, group}: Props) => {
  const classes = groupListCardStyles();
  const {group: contextGroup, setGroup} = useGroupViewContext();
  const {handleUserIds} = useUserListContext();
  const {items: previewItems, counts: previewCounts, expanded: previewExpanded} = useGroupListItemsContext();

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

  const count = useMemo<number>(() => {
    return group && previewCounts.has(group.id) ? previewCounts.get(group.id) : 0;
  }, [group, previewCounts]);

  const expanded = useMemo<boolean>(() => {
    return group && previewExpanded.has(group.id) ? previewExpanded.get(group.id) : true;
  }, [group, previewExpanded]);

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
          <Accordion className={classes.accordion} elevation={2} defaultExpanded expanded={expanded}>
            <GroupListCardHeader account={account} />
            <GroupsPreviewCardContent items={items} count={count} />
          </Accordion>
        </Box>
      </ThemeProvider>
    )
  );
};

export default flowRight([withAuthState, withGroupView, withItemList, withUserList, memo])(GroupListCard);
