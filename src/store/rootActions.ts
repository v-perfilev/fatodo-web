import {AppDispatch} from './store';
import {AuthActions} from './auth/authActions';
import {CalendarActions} from './calendar/calendarActions';
import {ChatActions} from './chat/chatActions';
import {ChatsActions} from './chats/chatsActions';
import {CommentsActions} from './comments/commentsActions';
import {ContactsActions} from './contacts/contactsActions';
import {EventsActions} from './events/eventsActions';
import {GroupActions} from './group/groupActions';
import {GroupsActions} from './groups/groupsActions';
import {ItemActions} from './item/itemActions';
import {UserActions} from './user/userActions';

export class RootActions {
  static afterLogoutState = () => (dispatch: AppDispatch) => {
    dispatch(AuthActions.afterLogout());
    dispatch(CalendarActions.afterLogout());
    dispatch(ChatActions.afterLogout());
    dispatch(ChatsActions.afterLogout());
    dispatch(CommentsActions.afterLogout());
    dispatch(ContactsActions.afterLogout());
    dispatch(EventsActions.afterLogout());
    dispatch(GroupActions.afterLogout());
    dispatch(GroupsActions.afterLogout());
    dispatch(ItemActions.afterLogout());
    dispatch(UserActions.afterLogout());
  };
}
