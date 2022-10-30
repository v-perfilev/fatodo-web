import ArrowUpIcon from '../icons/ArrowUpIcon';
import {Container, ContainerProps, Fab, SxProps} from '@mui/material';
import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import FBox from '../boxes/FBox';
import {HEADER_HEIGHT} from '../../constants';

type ScrollCornerButtonProps = ContainerProps & {
  show: boolean;
  action: () => void;
  down?: boolean;
  highlighted?: boolean;
  bottomPadding?: number;
};

const ScrollCornerButton = ({
  show,
  action,
  down,
  highlighted,
  bottomPadding = 0,
  ...props
}: ScrollCornerButtonProps) => {
  return show ? (
    <Container sx={containerStyles} {...props}>
      <FBox sx={boxStyles}>
        <Fab sx={fabStyles(bottomPadding)} size="small" color={highlighted ? 'primary' : undefined} onClick={action}>
          {down ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </Fab>
      </FBox>
    </Container>
  ) : null;
};

const containerStyles: SxProps = {
  marginTop: `calc(100vh - ${HEADER_HEIGHT}px)`,
};

const boxStyles: SxProps = {
  position: 'relative',
};

const fabStyles = (bottomPadding: number): SxProps => ({
  position: 'absolute',
  right: 0,
  bottom: bottomPadding + 10,
});

export default ScrollCornerButton;
