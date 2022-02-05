import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupListCardCreateLinkStyles} from './_styles';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {Link} from '../../../../components/controls';
import {useTranslation} from 'react-i18next';
import {ItemRouteUtils} from '../../../item/_router';

type Props = {};

const GroupListCardCreateButton: FC<Props> = ({}: Props) => {
  const classes = groupListCardCreateLinkStyles();
  const {t} = useTranslation();
  const {group} = useGroupViewContext();

  return (
    <Box className={classes.root}>
      <Link to={ItemRouteUtils.getCreateUrl(group.id)} withHoverUnderline>
        <Typography variant="subtitle1">{t('group:menu.createItem')}</Typography>
      </Link>
    </Box>
  );
};

export default GroupListCardCreateButton;
