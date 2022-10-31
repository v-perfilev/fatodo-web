import React, {ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Grid, SxProps, useMediaQuery} from '@mui/material';
import {HEADER_HEIGHT} from '../../constants';
import {Theme} from '@mui/material/styles';
import PageContainer from './PageContainer';
import {animated, useSpring} from 'react-spring';

export type PageMultipleColumnChildrenProps = {
  toggleCollapsed?: () => void;
};

type PageMultiColumnProps = {
  mainElement: (props: PageMultipleColumnChildrenProps) => ReactElement;
  additionalElement: (props: PageMultipleColumnChildrenProps) => ReactElement;
};

const PageMultiColumn = ({mainElement, additionalElement}: PageMultiColumnProps) => {
  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleCollapsed = useCallback(() => setCollapsed((prevState) => !prevState), [collapsed]);

  const childrenProps = useMemo<PageMultipleColumnChildrenProps>(
    () => ({toggleCollapsed: isSmallDevice ? toggleCollapsed : undefined}),
    [isSmallDevice, toggleCollapsed],
  );

  const firstNode = useMemo<ReactElement>(() => mainElement(childrenProps), [mainElement, childrenProps]);
  const secondNode = useMemo<ReactElement>(() => additionalElement(childrenProps), [additionalElement, childrenProps]);

  const animatedColumnStyle = useSpring({
    transform: collapsed ? 'translateX(0%)' : 'translateX(-100%)',
    backgroundColor: 'white',
  });

  useEffect(() => {
    setCollapsed(true);
  }, [isSmallDevice]);

  console.log(isSmallDevice, collapsed);

  return (
    <Grid sx={containerStyles(isSmallDevice)} container>
      <Grid item xs={6} md={7} lg={8}>
        <PageContainer withoutContainer>{firstNode}</PageContainer>
      </Grid>
      <Grid sx={smallDeviceAdditionalColumnStyles(isSmallDevice)} item xs={6} md={5} lg={4}>
        <animated.div style={animatedColumnStyle}>
          <PageContainer withoutContainer>{secondNode}</PageContainer>
        </animated.div>
      </Grid>
    </Grid>
  );
};

const containerStyles = (isSmallDevice: boolean): SxProps => ({
  position: 'relative',
  width: isSmallDevice ? '200vw' : '100vw',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'hidden',
});

const smallDeviceAdditionalColumnStyles = (isSmallDevice: boolean): SxProps =>
  !isSmallDevice
    ? {
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: 'grey.300',
        backgroundColor: 'white',
      }
    : {
        position: 'absolute',
        zIndex: 100,
        width: '50%',
        height: '100%',
        left: '50%',
      };

export default PageMultiColumn;
