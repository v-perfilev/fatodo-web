import {Group} from '../../models/group.model';
import {User} from '../../models/user.model';

export class GroupUtils {
  public static canAdmin = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.id === user.id);
    return member && member.permission === 'ADMIN';
  };

  public static canEdit = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.id === user.id);
    return member && (member.permission === 'ADMIN' || member.permission === 'EDIT');
  };

  public static canLeave = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.id === user.id);
    const adminCount = group.members.filter((member) => member.permission === 'ADMIN').length;
    return member && (member.permission !== 'ADMIN' || adminCount > 1);
  };
}
