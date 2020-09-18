import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import {ArrowAllIcon} from '../../common/icons/arrow-all-icon';
import {ColorUtils} from '../../../shared/utils/color.utils';
import {Group} from '../../../models/group.model';
import csx from 'classnames';
import RoundPic from '../../common/images/round-pic';

type Props = {
  group: Group;
  bind: (...any) => void;
};

const GroupSortingCardHeader: FC<Props> = ({group, bind}: Props) => {
  const classes = groupSortingCardHeaderStyles();
  const colorClassName = ColorUtils.getGradientColorClass(group.color);
  const classNames = csx(classes.root, colorClassName);

  return (
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
      action={<ArrowAllIcon {...bind} />}
      className={classNames}
    />
  );
};

export default GroupSortingCardHeader;
