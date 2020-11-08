import {ItemListContext} from '../../contexts/list-contexts/item-list-context';
import withList from './index';

const withItemList = withList(ItemListContext.Provider);
export default withItemList;
