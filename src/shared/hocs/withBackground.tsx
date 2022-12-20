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
        <FVStack>
          <FHStack justifyContent="center">
            <PageContent maxWidth="xs">
              <FHStack minHeight={100} justifyContent="center">
                <LogoWithText href={LANDING_URL} />
              </FHStack>
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
  width: '50vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const imgStyles: CSSProperties = {
  maxWidth: '50vw',
  maxHeight: '100vh',
};

export default withBackground;
