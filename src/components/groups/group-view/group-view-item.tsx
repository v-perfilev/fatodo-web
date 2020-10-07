import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemStyles} from './_styles';
import {CheckIcon} from '../../common/icons/check-icon';
import {PackageDownIcon} from '../../common/icons/package-down-icon';
import {EditIcon} from '../../common/icons/edit-icon';
import {DeleteIcon} from '../../common/icons/delete-icon';
import {Item} from '../../../models/item.model';
import {Link} from '../../common/layouts/link';
import {ItemRoutes} from '../../item/_router';
import {Routes} from '../../router';

type Props = {
  item: Item;
};

const GroupViewItem: FC<Props> = ({item}: Props) => {
  const classes = groupViewItemStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.iconBox}>
        <CheckIcon className={classes.icon} />
      </Box>
      <Box className={classes.contentBox}>
        <Link to={(Routes.ITEMS + ItemRoutes.VIEW).replace(':itemId', item.id)} color="textPrimary" withUnderline>
          {item.title}
        </Link>
      </Box>
      <Box className={classes.managementBox}>
        <PackageDownIcon className={classes.toggleIcon} />
        <EditIcon className={classes.editIcon} />
        <DeleteIcon className={classes.deleteIcon} />
      </Box>
    </Box>
  );
};

export default GroupViewItem;
