import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {PageHeader} from '../../../components/surfaces';
import {Link} from '../../../components/controls';
import {Routes} from '../../router';
import {useTranslation} from 'react-i18next';
import {GroupRouteUtils} from '../../group/_router';
import {Group} from '../../../models/group.model';

type Props = {
  title: string;
  group: Group;
};

const ItemViewHeader: FC<Props> = ({title, group}: Props) => {
  const {t} = useTranslation();

  const groupViewUrl = GroupRouteUtils.getViewUrl(group.id);

  return (
    <PageHeader>
      <Link to={Routes.GROUPS} withAlwaysUnderline>
        <Typography variant="body1">{t('header.groups')}</Typography>
      </Link>
      <Box>/</Box>
      <Link to={groupViewUrl} withAlwaysUnderline>
        <Typography variant="body1">{group.title}</Typography>
      </Link>
      <Box>/</Box>
      <Typography variant="h6">{title}</Typography>
    </PageHeader>
  );
};

export default ItemViewHeader;
