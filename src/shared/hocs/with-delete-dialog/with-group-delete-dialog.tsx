import withDeleteDialog from './index';
import {GroupDeleteContext} from '../../contexts/delete-contexts/group-delete-context';
import {GroupDeleteDialog} from '../../../components/group/dialogs/group-delete-dialog';

const withGroupDeleteDialog = withDeleteDialog(GroupDeleteContext.Provider, GroupDeleteDialog);
export default withGroupDeleteDialog;
