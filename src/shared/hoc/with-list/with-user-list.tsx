import withList from './index';
import {UserListContext} from '../../contexts/list-contexts/user-list-context';

const withUserList = withList(UserListContext.Provider);
export default withUserList;
