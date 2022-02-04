import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {PaperBox} from '../../surfaces';
import {SizeType} from '../../images/types';
import {UrlPic} from '../../images';
import {userViewStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
  picSize?: SizeType;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
  withInvertedBorder?: boolean;
};

export const UserView: FC<Props> = (props: Props) => {
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
          border={2}
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
