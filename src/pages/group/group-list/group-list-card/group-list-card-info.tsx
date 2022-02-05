import * as React from 'react';
import {FC, useMemo} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {Box, Typography} from '@material-ui/core';
import {groupListCardInfoStyles} from './_styles';
import {BoxWithIcon} from '../../../../components/surfaces';
import {ItemsIcon} from '../../../../components/icons/items-icon';
import {Link} from '../../../../components/controls';
import {useTranslation} from 'react-i18next';
import {GroupRouteUtils} from '../../_router';

type Props = {
  items: Item[];
  count: number;
};

const GroupListCardInfo: FC<Props> = ({items, count}: Props) => {
  const classes = groupListCardInfoStyles();
  const {group} = useGroupViewContext();
  const {t} = useTranslation();

  const showLinkToGroupView = useMemo<boolean>(() => {
    return count != items.length;
  }, [items, count]);

  return (
    <Box className={classes.root}>
      {showLinkToGroupView && (
        <Box className={classes.showAll}>
          <Link to={GroupRouteUtils.getViewUrl(group.id)} withHoverUnderline>
            <Typography variant="subtitle1">{t('group:tooltips.showAll')}</Typography>
          </Link>
        </Box>
      )}
      <Box className={classes.badges}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{count || 0}</BoxWithIcon>
      </Box>
    </Box>
  );
};

export default GroupListCardInfo;
