import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import {ArrowAllIcon} from '../../common/icons/arrow-all-icon';
import {ColorSchemeUtils} from '../../../shared/utils/color-scheme.utils';
import {Group} from '../../../models/group.model';
import csx from 'classnames';
import RoundPic from '../../common/images/round-pic';

type Props = {
  group: Group;
  bind: (...any) => void;
};

const GroupSortingCardHeader: FC<Props> = ({group, bind}: Props) => {
  const classes = groupSortingCardHeaderStyles();
  const colorClassName = ColorSchemeUtils.getBackgroundClass(group.color);
  const classNames = csx(classes.root, colorClassName);

  return (
    <CardHeader
      title={
        <Box className={classes.title}>
          {group.imageFilename && (
            <RoundPic url={group.imageFilename} size="md" color={group.color} variant={'secondary'} border={1} />
          )}
          <Typography variant={'h6'} className={classes.caption}>
            {group.title}
          </Typography>
        </Box>
      }
      action={<ArrowAllIcon {...bind} />}
      className={classNames}
    />
  );
};

export default GroupSortingCardHeader;
