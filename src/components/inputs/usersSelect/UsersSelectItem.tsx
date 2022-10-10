import React, {HTMLAttributes} from 'react';
import {Box, Theme} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {makeStyles} from '@material-ui/core/styles';
import CheckboxInput from '../CheckboxInput';
import UrlPic from '../../images/UrlPic';

type UsersSelectItemProps = HTMLAttributes<HTMLElement> & {
  user: User;
  isSelected: boolean;
  toggleSelected: () => void;
};

const UsersSelectItem = ({user, isSelected, toggleSelected, ...props}: UsersSelectItemProps) => {
  const classes = usersSelectItemStyles();

  return (
    <Box className={classes.root} {...props}>
      <UrlPic className={classes.image} alt={user.username} url={user.imageFilename} size="md" border={1} />
      <Box className={classes.user}>{user.username}</Box>
      <CheckboxInput onClick={toggleSelected} isSelected={isSelected} />
    </Box>
  );
};

const usersSelectItemStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  image: {
    marginRight: theme.spacing(1),
  },
  user: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export default UsersSelectItem;
