import * as React from 'react';
import {FC, memo, useEffect, useMemo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import GroupPreviewCardHeader from './group-preview-card-header';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {Item} from '../../../models/item.model';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';

type Props = AuthState;

const GroupPreviewCard: FC<Props> = ({account}: Props) => {
  const classes = groupCardStyles();
  const {handleUserIds} = useUserListContext();
  const {group} = useGroupViewContext();
  const {items: previewItems} = usePreviewItemListContext();

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
          <GroupPreviewCardHeader account={account} />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};

export default flowRight([withAuthState, withItemList, withUserList, memo])(GroupPreviewCard);
