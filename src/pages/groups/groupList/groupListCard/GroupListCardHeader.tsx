import React, {memo} from 'react';
import GroupListCardCollapseButton from './GroupListCardCollapseButton';
import GroupListCardMenuButton from './GroupListCardMenuButton';
import {Group} from '../../../../models/Group';
import FHStack from '../../../../components/boxes/FHStack';
import GroupListCardDragButton from './GroupListCardDragButton';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';
import {useNavigate} from 'react-router-dom';
import UrlPic from '../../../../components/images/UrlPic';
import {Box, SxProps} from '@mui/material';
import {Theme} from '@mui/material/styles';
import TruncatedTypography from '../../../../components/surfaces/TruncatedTypography';

type GroupListCardHeaderProps = {
  group: Group;
  collapsed: boolean;
  sorting: boolean;
  drag: any;
};

const GroupListCardHeader = ({group, collapsed, sorting, drag}: GroupListCardHeaderProps) => {
  const navigate = useNavigate();

  const goToGroupView = (): void => !sorting && navigate(GroupRouteUtils.getViewUrl(group.id));

  return (
    <FHStack sx={containerStyles} onClick={goToGroupView}>
      <Box sx={backgroundStyles} />
      <FHStack spacing={1}>
        {group?.imageFilename && <UrlPic url={group.imageFilename} sizes="9" />}
        <TruncatedTypography fontSize={16} color="primary">
          {group.title}
        </TruncatedTypography>
      </FHStack>
      <FHStack flexGrow={0} spacing={1}>
        {sorting ? (
          <GroupListCardDragButton drag={drag} />
        ) : (
          <>
            <GroupListCardCollapseButton group={group} collapsed={collapsed} />
            <GroupListCardMenuButton group={group} />
          </>
        )}
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

export default memo(GroupListCardHeader);
