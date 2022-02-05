import * as React from 'react';
import {FC, memo, useEffect, useMemo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import {groupsPreviewCardStyles} from './_styles';
import GroupPreviewCardBody from './groups-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import GroupsPreviewCardHeader from './groups-preview-card-header';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {Item} from '../../../models/item.model';
import {useGroupsPreviewListContext} from '../../../shared/contexts/list-contexts/groups-preview-list-context';

type Props = AuthState;

const GroupsPreviewCard: FC<Props> = ({account}: Props) => {
  const classes = groupsPreviewCardStyles();
  const {handleUserIds} = useUserListContext();
  const {group} = useGroupViewContext();
  const {items: previewItems} = useGroupsPreviewListContext();

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

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
    group && (
      <ThemeProvider theme={theme}>
        <Card elevation={3} className={classes.card}>
          <GroupsPreviewCardHeader account={account} />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};

export default flowRight([withAuthState, withItemList, withUserList, memo])(GroupsPreviewCard);
