import * as React from 'react';
import {FC} from 'react';
import {AccordionSummary, Box, Hidden, Typography} from '@material-ui/core';
import {groupsPreviewCardHeaderStyles} from './_styles';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {UrlPic} from '../../../../components/images';
import {UserAccount} from '../../../../models/user.model';
import Truncate from 'react-truncate';
import GroupsPreviewCardActions from './groups-preview-card-actions';
import GroupsPreviewCardExpandButton from './groups-preview-card-expand-button';
import {Routes} from '../../../router';
import {Link} from '../../../../components/controls';
import GroupsPreviewCardCreateButton from './groups-preview-card-create-button';
import GroupsPreviewCardAvatars from './groups-preview-card-avatars';

type Props = {
  account: UserAccount;
};

const GroupsPreviewCardHeader: FC<Props> = ({account}: Props) => {
  const classes = groupsPreviewCardHeaderStyles();
  const {group} = useGroupViewContext();

  return (
    <Link to={Routes.GROUPS + '/' + group.id}>
      <AccordionSummary className={classes.root}>
        <Box className={classes.title}>
          {group.imageFilename && <UrlPic url={group.imageFilename} size="md" />}
          <Typography variant="h6" className={classes.caption}>
            <Truncate>{group.title}</Truncate>
          </Typography>
        </Box>
        <Hidden smDown>
          <GroupsPreviewCardAvatars />
          <GroupsPreviewCardCreateButton />
        </Hidden>
        <GroupsPreviewCardActions account={account} />
        <GroupsPreviewCardExpandButton />
      </AccordionSummary>
    </Link>
  );
};

export default GroupsPreviewCardHeader;
