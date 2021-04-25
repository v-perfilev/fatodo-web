import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatContentMessageActionsStyles = makeStyles((theme: Theme) => ({
  popupMenu: {
    '& .MuiListItem-root': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiSvgIcon-root': {
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5)
    }
  }
}));

export const chatContentMessageEventStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: theme.palette.grey['500']
  }
}));

export const chatContentMessageIncomingStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start'
  },
  message: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['100'],

    '&.unread': {
      borderWidth: 2,
      borderColor: theme.palette.primary.main
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    margin: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  },
  date: {
    color: theme.palette.grey['500']
  },
  body: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  }
}));

export const chatContentMessageOutcomingStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '90%',
    float: 'right',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-end'
  },
  message: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['300'],
    borderRadius: 5,
    backgroundColor: theme.palette.grey['100']
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    margin: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  },
  date: {
    color: theme.palette.grey['500']
  },
  body: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  }
}));
