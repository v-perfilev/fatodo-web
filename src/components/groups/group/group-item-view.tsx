import React, {FC} from 'react';
import {GroupItem} from '../_types';
import {Box} from '@material-ui/core';
import {groupItemViewStyles} from './_styles';
import {CheckIcon} from '../../../shared/components/icons/check-icon';
import {PackageDownIcon} from '../../../shared/components/icons/package-down-icon';
import {EditIcon} from '../../../shared/components/icons/edit-icon';
import {DeleteIcon} from '../../../shared/components/icons/delete-icon';

type Props = {
  item: GroupItem;
}

const GroupItemView: FC<Props> = ({item}: Props) => {
  const classes = groupItemViewStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
        <CheckIcon className={classes.icon} />
      </Box>
      <Box className={classes.contentBox}>
        {item.title}
      </Box>
      <Box className={classes.managementBox}>
        <PackageDownIcon className={classes.toggleIcon} />
        <EditIcon className={classes.editIcon} />
        <DeleteIcon className={classes.deleteIcon} />
      </Box>
    </Box>
  );
};

export default GroupItemView;
