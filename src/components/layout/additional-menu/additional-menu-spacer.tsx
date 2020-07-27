import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';

const AdditionalMenuSpacer: FC = () => {
  const style = {flexGrow: 1};
  return <Box style={style} />;
};

export default AdditionalMenuSpacer;
