import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {UrlPic} from '../../../components/images';
import {Grower, PageHeader} from '../../../components/surfaces';
import {useTranslation} from 'react-i18next';
import {Link} from '../../../components/controls';
import {Routes} from '../../router';
import {Group} from '../../../models/group.model';
import GroupViewArchivedSwitch from './group-view-archived-switch';

type Props = {
  group: Group;
  showArchived: boolean;
  setShowArchived: (showArchived: boolean) => void;
};

const GroupViewHeader: FC<Props> = ({group, showArchived, setShowArchived}: Props) => {
  const {t} = useTranslation();

  return (
    <PageHeader>
      <Link to={Routes.GROUPS} withAlwaysUnderline>
        <Typography variant="body1">{t('header.groups')}</Typography>
      </Link>
      <Box>/</Box>
      {group.imageFilename && <UrlPic url={group.imageFilename} size="md" border={2} />}
      <Typography variant="h6">{group.title}</Typography>
      <Grower />
      <GroupViewArchivedSwitch showArchived={showArchived} setShowArchived={setShowArchived} />
    </PageHeader>
  );
};

export default GroupViewHeader;
