import * as React from 'react';
import {FC} from 'react';
import {CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import {ArrowAllIcon} from '../../common/icons/arrow-all-icon';
import {ColorUtils} from '../../../shared/utils/color.utils';
import {Group} from '../../../models/group.model';
import csx from 'classnames';

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
        <Typography variant={'h6'} className={classes.caption}>
          {group.title}
        </Typography>
      }
      action={<ArrowAllIcon {...bind} />}
      className={classNames}
    />
  );
};

export default GroupSortingCardHeader;
