import * as React from 'react';
import {FC, ReactNode} from 'react';
import {notificationProviderStyles} from './_styles';
import {SnackbarProvider} from 'notistack';

interface ComponentProps {
  children: ReactNode;
}

type Props = ComponentProps;

export const NotificationProvider: FC<Props> = ({children}: Props) => {
  const classes = notificationProviderStyles();

  return (
    <SnackbarProvider classes={classes} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
      {children}
    </SnackbarProvider>
  );
};
