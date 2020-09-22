import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupCardHeaderStyles} from './_styles';
import Link from '../../common/layouts/link';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import Index from '../../common/images';
import GroupPreviewCardActions from './group-preview-card-actions';

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
            {group.imageFilename && <Index url={group.imageFilename} size="md" />}
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
