import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import {groupPreviewCardItemButtonsStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';

type Props = {
  item: Item;
};

const GroupPreviewCardItemButtons: FC<Props> = ({item}: Props) => {
  const classes = groupPreviewCardItemButtonsStyles();
  const history = useHistory();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);

  return (
    <IconButton size="small" className={classes.showIcon} onClick={redirectToViewItem}>
      <EyeIcon />
    </IconButton>
  );
};

export default GroupPreviewCardItemButtons;