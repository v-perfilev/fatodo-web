import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupCardHeaderStyles} from './_styles';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import GroupPreviewCardActions from './group-preview-card-actions';
import {RoundPic} from '../../common/images/round-pic';
import {Link} from '../../common/layouts/link';

type Props = {
  group: Group;
};

const GroupPreviewCardHeader: FC<Props> = ({group}: Props) => {
  const classes = groupCardHeaderStyles();

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
        action={
          <GroupPreviewCardActions group={group}/>
        }
        className={classes.root}
      />
    </Link>
  );
};

export default GroupPreviewCardHeader;
