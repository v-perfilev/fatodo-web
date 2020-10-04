import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';

const withMui = (Component: ComponentType): FC => (props): ReactElement => {
  const {i18n} = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={i18n.language}>
      <Component {...props} />
    </MuiPickersUtilsProvider>
  );
};

export default withMui;
