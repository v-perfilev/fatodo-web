import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {UrlPic} from '../../../components/images';
import {PageHeader} from '../../../components/surfaces';
import {useTranslation} from 'react-i18next';
import {Link} from '../../../components/controls';
import {Routes} from '../../router';

type Props = {
  title: string;
  filename?: string;
};

const GroupViewHeader: FC<Props> = ({title, filename}: Props) => {
  const {t} = useTranslation();

  return (
    <PageHeader>
      <Link to={Routes.GROUPS} withAlwaysUnderline>
        <Typography variant="body1">{t('header.groups')}</Typography>
      </Link>
      <Box>/</Box>
      {filename && <UrlPic url={filename} size="md" border={2} />}
      <Typography variant="h6">{title}</Typography>
    </PageHeader>
  );
};

export default GroupViewHeader;
