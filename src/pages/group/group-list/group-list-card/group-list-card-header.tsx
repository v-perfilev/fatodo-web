import * as React from 'react';
import {FC} from 'react';
import {AccordionSummary, Box, Hidden, Typography} from '@material-ui/core';
import {groupListCardHeaderStyles} from './_styles';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {UrlPic} from '../../../../components/images';
import {UserAccount} from '../../../../models/user.model';
import Truncate from 'react-truncate';
import GroupListCardActions from './group-list-card-actions';
import GroupListCardExpandButton from './group-list-card-expand-button';
import {Routes} from '../../../router';
import {Link} from '../../../../components/controls';
import GroupListCardCreateButton from './group-list-card-create-button';
import GroupListCardAvatars from './group-list-card-avatars';

type Props = {
  account: UserAccount;
};

const GroupListCardHeader: FC<Props> = ({account}: Props) => {
  const classes = groupListCardHeaderStyles();
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
          <GroupListCardAvatars />
          <GroupListCardCreateButton />
        </Hidden>
        <GroupListCardActions account={account} />
        <GroupListCardExpandButton />
      </AccordionSummary>
    </Link>
  );
};

export default GroupListCardHeader;
