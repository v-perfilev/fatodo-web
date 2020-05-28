import * as React from 'react';
import {FC} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import withCentralContainer from '../common/hoc/with-central-container';
import {compose} from 'redux';
import withRedirectTimer, {RedirectTimerProps} from '../common/hoc/with-redirect-timer';

type Props = RedirectTimerProps;

const InternalError: FC<Props> = ({timer, resetTimer}: Props) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" color="primary">
        Account was successfully activated.
      </Typography>
      <Box m={1} />
      <Typography variant="h5" color="primary">
        Now you can sign in!
      </Typography>
      <Box m={2} />
      <Typography>For redirecting to home page press the button or wait {timer} seconds...</Typography>
      <Box m={2} />
      <Button variant="contained" color="primary" size="large" onClick={resetTimer}>
        To home page
      </Button>
    </Box>
  );
};

const composer = compose(withCentralContainer, withRedirectTimer());
export default composer(InternalError);
