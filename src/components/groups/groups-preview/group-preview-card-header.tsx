import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, IconButton, Typography} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardHeaderStyles} from './_styles';
import Link from '../../common/inputs/link';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import RoundPic from '../../common/images/round-pic';

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
            {group.imageFilename && <RoundPic url={group.imageFilename} size="md" border={1} />}
            <Typography variant={'h6'} className={classes.caption}>
              {group.title}
            </Typography>
          </Box>
        }
        action={
          <IconButton aria-label="settings" className={classes.action}>
            <DotsVerticalIcon />
          </IconButton>
        }
        className={classes.root}
      />
    </Link>
  );
};

export default GroupPreviewCardHeader;
