import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, IconButton, Typography} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardHeaderStyles} from './_styles';
import Link from '../../common/inputs/link';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import {ColorSchemeUtils} from '../../../shared/utils/color-scheme.utils';
import csx from 'classnames';
import RoundPic from '../../common/images/round-pic';

type Props = {
  group: Group;
};

const GroupPreviewCardHeader: FC<Props> = ({group}: Props) => {
  const classes = groupCardHeaderStyles();
  const colorClassName = ColorSchemeUtils.getBackgroundClass(group.color);
  const classNames = csx(classes.root, colorClassName);

  return (
    <Link to={Routes.GROUPS + '/' + group.id}>
      <CardHeader
        title={
          <Box className={classes.title}>
            {group.imageFilename && (
              <RoundPic url={group.imageFilename} whiteBorder size="md" />
            )}
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
        className={classNames}
      />
    </Link>
  );
};

export default GroupPreviewCardHeader;
