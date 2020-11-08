import {GroupViewContext} from '../../contexts/view-contexts/group-view-context';
import withView from './index';

const withGroupView = withView(GroupViewContext.Provider);
export default withGroupView;
