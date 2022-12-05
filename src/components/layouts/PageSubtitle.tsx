import React from 'react';
import {Box, SxProps, Typography} from '@mui/material';
import FVStack from '../boxes/FVStack';
import PageDivider from './PageDivider';

type PageSubtitleProps = {
  subtitle: string;
};

const PageSubtitle = ({subtitle}: PageSubtitleProps) => {
  return (
    <FVStack spacing={1}>
      <Box sx={contentStyles}>
        <Typography fontSize={16} color="grey.700">
          {subtitle}
        </Typography>
      </Box>
      <PageDivider />
    </FVStack>
  );
};

const contentStyles: SxProps = {
  paddingLeft: 2,
  paddingRight: 1,
};

export default PageSubtitle;
