import * as React from 'react';
import {FC} from 'react';
import {CardHeader, IconButton, Typography} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardHeaderStyles} from './_styles';
import Link from '../../common/inputs/link';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import {ColorUtils} from '../../../shared/utils/color.utils';
import csx from 'classnames';

type Props = {
  group: Group;
};

const GroupPreviewCardHeader: FC<Props> = ({group}: Props) => {
  const classes = groupCardHeaderStyles();
  const colorClassName = ColorUtils.getGradientColorClass(group.color);
  const classNames = csx(classes.root, colorClassName);

  return (
    <CardHeader
      title={
        <Link to={Routes.GROUPS + '/' + group.id}>
          <Typography variant={'h6'} className={classes.caption}>
            {group.title}
          </Typography>
        </Link>
      }
      action={
        <IconButton aria-label="settings" className={classes.action}>
          <DotsVerticalIcon />
        </IconButton>
      }
      className={classNames}
    />
  );
};

export default GroupPreviewCardHeader;
