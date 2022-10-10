import React, {FC, HTMLAttributes} from 'react';
import {User} from '../../models/user.model';
import UserInfoView from './userInfoView/UserInfoView';
import {PopupContentComponentProps} from '../surfaces/hoverPopup/HoverPopupPopper';
import {PicSizeType} from '../images/UrlPic';
import UserView from './UserView';
import HoverPopup from '../surfaces/hoverPopup/HoverPopup';

type UserWithPopupViewProps = HTMLAttributes<HTMLElement> & {
  user: User;
  picSize?: PicSizeType;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
  withInvertedBorder?: boolean;
};

const UserWithPopupView = (props: UserWithPopupViewProps) => {
  const {user, picSize, withUserPic, withUsername, withPaperBox, withInvertedBorder, className} = props;

  const AnchorComponent: FC<any> = (props: any) => (
    <UserView {...{user, picSize, withUserPic, withUsername, withPaperBox, withInvertedBorder, className}} {...props} />
  );

  const PopupComponent: FC<PopupContentComponentProps> = (props: any) => <UserInfoView user={user} {...props} />;

  return <HoverPopup AnchorComponent={AnchorComponent} PopupComponent={PopupComponent} />;
};

export default UserWithPopupView;
