import React, {ComponentType, CSSProperties} from 'react';
import {Box, Grid, Hidden, Stack, SxProps} from '@mui/material';
import {LANDING_URL} from '../../constants';
import LogoWithText from '../../components/images/LogoWithText';
import LanguageSelect from '../../components/controls/LanguageSelect';

const withBackground = (imgSrc: string) => (Component: ComponentType) => (props: any) => {
  return (
    <Grid container>
      <Grid sx={leftBoxStyles} item xs={12} md={6}>
        <Stack sx={leftBoxContainerStyles} spacing={2} alignItems="center">
          <LogoWithText href={LANDING_URL} />
          <Component {...props} />
          <LanguageSelect />
        </Stack>
      </Grid>
      <Hidden smDown>
        <Grid sx={rightBoxStyles} item md={6}>
          <Box sx={imgBoxStyles}>
            <img style={imgStyles} src={imgSrc} alt="Fatodo background" />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
};

const leftBoxStyles: SxProps = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingY: 5,
};

const leftBoxContainerStyles: SxProps = {
  width: 350,
  maxWidth: '90%',
};

const rightBoxStyles: SxProps = {
  position: 'relative',
};

const imgBoxStyles: SxProps = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const imgStyles: CSSProperties = {
  minWidth: '100%',
  minHeight: '100%',
};

export default withBackground;
