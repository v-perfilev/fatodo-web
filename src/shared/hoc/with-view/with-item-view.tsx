import {ItemViewContext} from '../../contexts/view-contexts/item-view-context';
import withView from './index';

const withItemView = withView(ItemViewContext.Provider);
export default withItemView;
