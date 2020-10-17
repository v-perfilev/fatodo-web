import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import csx from 'classnames';
import {userViewStyles} from './_styles';
import {Box} from '@material-ui/core';
import {User} from '../../../../models/user.model';
import {RoundPic} from '../../images/round-pic';
import {PaperBox} from '../../surfaces/paper-box';

type Props = HTMLAttributes<any> & {
  user: User;
  picSize?: 'xs' | 'sm' | 'md' | 'lg';
  withUsername?: boolean;
  withPaperBox?: boolean;
};

export const UserView: FC<Props> = (props: Props) => {
  const classes = userViewStyles();
  const {user, picSize = 'xs', withUsername = false, withPaperBox = false, className} = props;
  const classNames = csx(classes.root, className);

  const imageWithUsername = (
    <>
      <RoundPic alt={user.username} url={user.imageFilename} size={picSize} border={1} />
      {withUsername && <Box className={classes.username}>{user.username}</Box>}
    </>
  );

  const userView = withPaperBox
    ? <PaperBox>{imageWithUsername}</PaperBox>
    : imageWithUsername;

  return (
    <Box className={classNames}>
      {userView}
    </Box>
  );
};
