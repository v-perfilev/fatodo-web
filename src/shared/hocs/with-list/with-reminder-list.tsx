import withList from './index';
import {ReminderListContext} from '../../contexts/list-contexts/reminder-list-context';

const withReminderList = withList(ReminderListContext.Provider);
export default withReminderList;
