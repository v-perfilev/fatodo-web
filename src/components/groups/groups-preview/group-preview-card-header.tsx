import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupCardHeaderStyles} from './_styles';
import {Routes} from '../../router';
import GroupPreviewCardActions from './group-preview-card-actions';
import {RoundPic} from '../../common/images/round-pic';
import {Link} from '../../common/controls/link';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

const GroupPreviewCardHeader: FC = () => {
  const classes = groupCardHeaderStyles();
  const {group} = useGroupViewContext();

  return (
    <Link to={Routes.GROUPS + '/' + group.id}>
      <CardHeader
        title={
          <Box className={classes.title}>
            {group.imageFilename && <RoundPic url={group.imageFilename} size="md" />}
            <Typography variant={'h6'} className={classes.caption}>
              {group.title}
            </Typography>
          </Box>
        }
        action={<GroupPreviewCardActions />}
        className={classes.root}
      />
    </Link>
  );
};

export default GroupPreviewCardHeader;
