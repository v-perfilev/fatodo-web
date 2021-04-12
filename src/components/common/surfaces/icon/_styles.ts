import {makeStyles, Theme} from '@material-ui/core/styles';

export const iconWithMarginStyles = makeStyles((theme: Theme) => ({
  top: (spacing: number): any => ({
    marginTop: theme.spacing(spacing),
  }),
  right: (spacing: number): any => ({
    marginRight: theme.spacing(spacing),
  }),
  bottom: (spacing: number): any => ({
    marginBottom: theme.spacing(spacing),
  }),
  left: (spacing: number): any => ({
    marginLeft: theme.spacing(spacing),
  }),
}));
