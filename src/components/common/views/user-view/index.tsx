import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../../models/user.model';
import {PaperBox} from '../../surfaces';
import {SizeType} from '../../images/types';
import {UrlPic} from '../../images';
import {userViewStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
  picSize: SizeType;
  withUsername?: boolean;
  withPaperBox?: boolean;
};

export const UserView: FC<Props> = (props: Props) => {
  const classes = userViewStyles();
  const {user, picSize, withUsername, withPaperBox, onMouseOver, onMouseLeave, className} = props;

  const classNames = csx(className, classes.root);

  const imageWithUsername = (
    <>
      <UrlPic alt={user.username} url={user.imageFilename} size={picSize} border={1} />
      {withUsername && <Box className={classes.username}>{user.username}</Box>}
    </>
  );

  const userView = withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;

  return (
    <Box onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={classNames}>
      {userView}
    </Box>
  );
};
