import withDeleteDialog from './index';
import {ItemDeleteContext} from '../../contexts/delete-contexts/item-delete-context';
import {ItemDeleteDialog} from '../../../components/common/dialogs/item-delete-dialog';

const withItemDeleteDialog = withDeleteDialog(ItemDeleteContext.Provider, ItemDeleteDialog);
export default withItemDeleteDialog;
