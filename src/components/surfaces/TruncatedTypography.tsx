import {styled, Typography} from '@mui/material';

const TruncatedTypography = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export default TruncatedTypography;
