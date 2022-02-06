import * as React from 'react';
import {FC, useMemo} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {Box, Button} from '@material-ui/core';
import {groupListCardInfoStyles} from './_styles';
import {BoxWithIcon} from '../../../../components/surfaces';
import {ItemsIcon} from '../../../../components/icons/items-icon';
import {useTranslation} from 'react-i18next';
import {ItemRouteUtils} from '../../../item/_router';
import {EyeIcon} from '../../../../components/icons/eye-icon';
import {GroupRouteUtils} from '../../_router';
import {useHistory} from 'react-router-dom';
import {PlusIcon} from '../../../../components/icons/plus-icon';

type Props = {
  items: Item[];
  count: number;
};

const GroupListCardInfo: FC<Props> = ({items, count}: Props) => {
  const classes = groupListCardInfoStyles();
  const history = useHistory();
  const {group} = useGroupViewContext();
  const {t} = useTranslation();

  const showButtonToGroupView = useMemo<boolean>(() => count != items.length, [items, count]);
  const showButtonToCreateItem = useMemo<boolean>(() => count === 0, [count]);
  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(group.id));
  const redirectToItemCreate = (): void => history.push(ItemRouteUtils.getCreateUrl(group.id));

  return (
    <Box className={classes.root}>
      <Box className={classes.buttons}>
        {showButtonToGroupView && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EyeIcon />}
            onClick={redirectToGroupView}
          >
            {t('group:tooltips.showAll')}
          </Button>
        )}
        {showButtonToCreateItem && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlusIcon />}
            onClick={redirectToItemCreate}
          >
            {t('group:menu.createItem')}
          </Button>
        )}
      </Box>
      <Box className={classes.badges}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{count || 0}</BoxWithIcon>
      </Box>
    </Box>
  );
};

export default GroupListCardInfo;
