import React, {ComponentType, CSSProperties} from 'react';
import {Box, Grid, Hidden, SxProps} from '@mui/material';
import {LANDING_URL} from '../../constants';
import LogoWithText from '../../components/images/LogoWithText';
import LanguageSelect from '../../components/controls/LanguageSelect';
import FHStack from '../../components/boxes/FHStack';
import FVStack from '../../components/boxes/FVStack';
import PageContent from '../../components/layouts/PageContent';

const withBackground = (imgSrc: string) => (Component: ComponentType) => (props: any) => {
  return (
    <Grid container>
      <Grid sx={containerStyles} item xs={12} md={6}>
        <FVStack alignItems="stretch">
          <FHStack minHeight={100} justifyContent="center">
            <LogoWithText href={LANDING_URL} />
          </FHStack>
          <FHStack justifyContent="center">
            <PageContent maxWidth="xs">
              <Component {...props} />
            </PageContent>
          </FHStack>
          <FHStack minHeight={100} justifyContent="center">
            <LanguageSelect />
          </FHStack>
        </FVStack>
      </Grid>
      <Hidden smDown>
        <Grid sx={containerStyles} item md={6}>
          <Box sx={imgBoxStyles}>
            <img style={imgStyles} src={imgSrc} alt="Fatodo background" />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
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
