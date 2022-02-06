import * as React from 'react';
import {FC, memo, useEffect, useMemo} from 'react';
import {Accordion, Box, ThemeProvider} from '@material-ui/core';
import {flowRight} from 'lodash';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useGroupListItemsContext} from '../../../../shared/contexts/list-contexts/group-list-items-context';
import {Item} from '../../../../models/item.model';
import {ThemeFactory} from '../../../../shared/theme/theme';
import withAuthState from '../../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import GroupListCardHeader from './group-list-card-header';
import {groupListCardStyles} from './_styles';
import GroupListCardContent from './group-list-card-content';

type Props = AuthState & {
  sorting: boolean;
  bind: (...any) => void;
};

const GroupListCard: FC<Props> = ({account, sorting, bind}: Props) => {
  const classes = groupListCardStyles();
  const {group} = useGroupViewContext();
  const {handleUserIds} = useUserListContext();
  const {items: listItems, counts: listCounts, collapsed: listCollapsed} = useGroupListItemsContext();

  const items = useMemo<Item[]>(() => {
    return group && listItems.has(group.id) ? listItems.get(group.id) : [];
  }, [group, listItems]);

  const count = useMemo<number>(() => {
    return group && listCounts.has(group.id) ? listCounts.get(group.id) : 0;
  }, [group, listCounts]);

  const collapsed = useMemo<boolean>(() => {
    return group && listCollapsed.has(group.id) ? listCollapsed.get(group.id) : false;
  }, [group, listCollapsed]);

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
    <ThemeProvider theme={theme}>
      <Box className={classes.box}>
        <Accordion className={classes.accordion} elevation={2} expanded={!sorting && !collapsed}>
          <GroupListCardHeader account={account} sorting={sorting} bind={bind} />
          <GroupListCardContent items={items} count={count} />
        </Accordion>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([withAuthState, memo])(GroupListCard);
