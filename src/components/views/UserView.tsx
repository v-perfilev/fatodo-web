import React, {HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../models/user.model';
import csx from 'classnames';
import {makeStyles, Theme} from '@material-ui/core/styles';
import UrlPic, {PicSizeType} from '../images/UrlPic';
import PaperBox from '../surfaces/PaperBox';

type UserViewProps = HTMLAttributes<HTMLElement> & {
  user: User;
  picSize?: PicSizeType;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
  withInvertedBorder?: boolean;
};

const UserView = (props: UserViewProps) => {
  const {user, picSize = 'xs'} = props;
  const {withUserPic = true, withUsername = false, withPaperBox = false, withInvertedBorder = false} = props;
  const {onMouseOver, onMouseLeave, className} = props;
  const classes = userViewStyles();

  const imageWithUsername = (
    <>
      {withUserPic && (
        <UrlPic
          alt={user.username}
          url={user.imageFilename}
          size={picSize}
          border={1}
          invertedBorder={withInvertedBorder}
        />
      )}
      {withUserPic && withUsername && <Box className={classes.divider} />}
      {withUsername && <Box>{user.username}</Box>}
    </>
  );

  const userView = withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;

  const classNames = csx(className, classes.root);

  return (
    <Box onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={classNames}>
      {userView}
    </Box>
  );
};

const userViewStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  divider: {
    width: theme.spacing(1),
  },
}));

export default UserView;
