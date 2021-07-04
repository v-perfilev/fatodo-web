import React, {FC, HTMLAttributes, memo} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {userSelectItemStyles} from './_styles';
import {UrlPic} from '../../images';
import {CheckboxInput} from '../../inputs';

type Props = HTMLAttributes<HTMLElement> & {
  user: User;
  isSelected: boolean;
  toggleSelected: () => void;
};

const UserSelectItem: FC<Props> = ({user, isSelected, toggleSelected, ...props}: Props) => {
  const classes = userSelectItemStyles();

  return (
    <Box className={classes.root} {...props}>
      <UrlPic className={classes.image} alt={user.username} url={user.imageFilename} size="md" border={1} />
      <Box className={classes.user}>{user.username}</Box>
      <CheckboxInput onClick={toggleSelected} isSelected={isSelected} />
    </Box>
  );
};

export default memo(UserSelectItem);
