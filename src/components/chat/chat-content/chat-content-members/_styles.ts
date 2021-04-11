import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_HEADER_HEIGHT} from '../../_constants';


export const chatContentMembers = makeStyles((theme: Theme) => ({
  memberCount: {
    height: '100%',
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
    fontSize: '1rem'
  },
}));

export const chatContentMembersDialog = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
    fontSize: '1rem'
  },
  title: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.gradient,
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
