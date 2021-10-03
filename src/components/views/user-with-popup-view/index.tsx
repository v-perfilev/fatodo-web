import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {User} from '../../../models/user.model';
import {SizeType} from '../../images/types';
import UserInfoView from '../user-info-view';
import {HoverPopup} from '../../surfaces';
import {UserView} from '../user-view';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
  picSize?: SizeType;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
};

export const UserWithPopupView: FC<Props> = (props: Props) => {
  const {user, picSize, withUserPic, withUsername, withPaperBox, className} = props;

  const AnchorComponent: FC<any> = (props: any) => (
    <UserView {...{user, picSize, withUserPic, withUsername, withPaperBox, className}} {...props} />
  );

  const PopupComponent: FC<any> = (props: any) => <UserInfoView user={user} {...props} />;

  return <HoverPopup AnchorComponent={AnchorComponent} PopupComponent={PopupComponent} />;
};
