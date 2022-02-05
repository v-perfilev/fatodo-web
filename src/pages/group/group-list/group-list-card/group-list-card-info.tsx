import * as React from 'react';
import {FC} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {Box, Typography} from '@material-ui/core';
import {groupListCardInfoStyles} from './_styles';
import {BoxWithIcon} from '../../../../components/surfaces';
import {ItemsIcon} from '../../../../components/icons/items-icon';
import {Link} from '../../../../components/controls';
import {Routes} from '../../../router';
import {useTranslation} from 'react-i18next';

type Props = {
  items: Item[];
  count: number;
};

const GroupListCardInfo: FC<Props> = ({items, count}: Props) => {
  const classes = groupListCardInfoStyles();
  const {group} = useGroupViewContext();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <Box className={classes.showAll}>
        <Link to={Routes.GROUPS + '/' + group.id} withHoverUnderline>
          <Typography variant="subtitle1">{t('group:tooltips.showAll')}</Typography>
        </Link>
      </Box>
      <Box className={classes.badges}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{count || 0}</BoxWithIcon>
      </Box>
    </Box>
  );
};

export default GroupListCardInfo;
