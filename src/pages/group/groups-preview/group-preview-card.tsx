import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import withItemList from '../../../shared/hocs/with-list/with-item-list';

type Props = AuthState & {
  height: number;
};

const GroupPreviewCard: FC<Props> = ({account, height}: Props) => {
  const classes = groupCardStyles();
  const {handleResponse} = useSnackContext();
  const {handleUserIds} = useUserListContext();
  const {objs: items, setObjs: setItems, setLoad: setLoadItems} = useItemListContext();
  const {obj: group} = useGroupViewContext();

  const loadItems = (): void => {
    ItemService.getAllItemsByGroupId(group.id)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

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
      setLoadItems(() => (): void => loadItems());
      loadGroupUsers();
    }
  }, [group]);

  useEffect(() => {
    if (items) {
      loadItemsUsers();
    }
  }, [items]);

  const theme = ThemeFactory.getTheme(group?.color);
  const style = {height: height};

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card elevation={3} className={classes.card} style={style}>
          <GroupPreviewCardHeader account={account} />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};
export default flowRight([withAuthState, withItemList, withUserList, memo])(GroupPreviewCard);
