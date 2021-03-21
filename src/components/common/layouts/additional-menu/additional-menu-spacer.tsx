import * as React from 'react';
import {FC} from 'react';
import {Box, Theme, useMediaQuery} from '@material-ui/core';

type Props = {
  showOnBigDevices?: boolean;
  showOnSmallDevices?: boolean;
};

const AdditionalMenuSpacer: FC<Props> = ({showOnBigDevices, showOnSmallDevices}: Props) => {
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const showSpacer = (showOnBigDevices && isBigDevice) || (showOnSmallDevices && !isBigDevice);

  const style = {flexGrow: 1};
  return showSpacer ? <Box style={style} /> : null;
};

export default AdditionalMenuSpacer;
