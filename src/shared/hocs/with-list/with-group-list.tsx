import {GroupListContext} from '../../contexts/list-contexts/group-list-context';
import withList from './index';

const withGroupList = withList(GroupListContext.Provider);
export default withGroupList;
