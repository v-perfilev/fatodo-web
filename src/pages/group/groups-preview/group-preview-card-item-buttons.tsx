import React, {FC} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {groupPreviewCardItemButtonsStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {ItemRouteUtils} from '../../item/_router';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

type Props = {
  item: Item;
};

const GroupPreviewCardItemButtons: FC<Props> = ({item}: Props) => {
  const classes = groupPreviewCardItemButtonsStyles();
  const history = useHistory();
  const {t} = useTranslation();

  const viewItemUrl = ItemRouteUtils.getViewUrl(item.id);
  const redirectToViewItem = (): void => history.push(viewItemUrl);

  const clickOnViewButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    redirectToViewItem();
  };

  return (
    <Tooltip title={t('group:tooltips.view')}>
      <IconButton size="small" className={classes.showIcon} onClick={clickOnViewButton}>
        <EyeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default GroupPreviewCardItemButtons;
