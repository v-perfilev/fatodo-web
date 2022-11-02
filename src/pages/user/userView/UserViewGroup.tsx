import React from 'react';
import {Group} from '../../../models/Group';
import FHStack from '../../../components/boxes/FHStack';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {Box, SxProps} from '@mui/material';
import {Theme} from '@mui/material/styles';
import UrlPic from '../../../components/images/UrlPic';
import TruncatedTypography from '../../../components/surfaces/TruncatedTypography';

type UserViewGroupProps = {
  group: Group;
};

const UserViewGroup = ({group}: UserViewGroupProps) => {
  const navigate = useNavigate();

  const goToGroupView = (): void => navigate(GroupRouteUtils.getViewUrl(group.id));

  return (
    <FHStack sx={containerStyles} onClick={goToGroupView}>
      <Box sx={backgroundStyles} />
      <FHStack spacing={1}>
        {group?.imageFilename && <UrlPic url={group.imageFilename} sizes="9" />}
        <TruncatedTypography fontSize={16} color="primary">
          {group.title}
        </TruncatedTypography>
      </FHStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 50,
  borderRadius: 3,
  paddingLeft: 2,
  paddingRight: 1,
  backgroundColor: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'grey.200',
  },
};

const backgroundStyles: SxProps = (theme: Theme) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  marginLeft: '0px !important',
  opacity: 0.3,
  background: theme.palette.gradient,
});

export default flowRight(withThemeProvider)(UserViewGroup);
