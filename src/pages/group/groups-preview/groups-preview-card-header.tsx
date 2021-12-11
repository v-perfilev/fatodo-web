import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupsPreviewCardHeaderStyles} from './_styles';
import {Routes} from '../../router';
import GroupsPreviewCardActions from './groups-preview-card-actions';
import {Link} from '../../../components/controls';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UrlPic} from '../../../components/images';
import {UserAccount} from '../../../models/user.model';
import Truncate from 'react-truncate';

type Props = {
  account: UserAccount;
};

const GroupsPreviewCardHeader: FC<Props> = ({account}: Props) => {
  const classes = groupsPreviewCardHeaderStyles();
  const {group} = useGroupViewContext();

  return (
    <Link to={Routes.GROUPS + '/' + group.id}>
      <CardHeader
        title={
          <Box className={classes.title}>
            {group.imageFilename && <UrlPic url={group.imageFilename} size="md" />}
            <Typography variant="h6" className={classes.caption}>
              <Truncate>{group.title}</Truncate>
            </Typography>
          </Box>
        }
        action={<GroupsPreviewCardActions account={account} />}
        className={classes.root}
      />
    </Link>
  );
};

export default GroupsPreviewCardHeader;
