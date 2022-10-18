import {styled, Typography} from '@mui/material';

const TruncatedTypography = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export default TruncatedTypography;
