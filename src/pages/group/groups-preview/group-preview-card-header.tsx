import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupCardHeaderStyles} from './_styles';
import {Routes} from '../../router';
import GroupPreviewCardActions from './group-preview-card-actions';
import {Link} from '../../../components/controls';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UrlPic} from '../../../components/images';
import {UserAccount} from '../../../models/user.model';

type Props = {
  account: UserAccount;
};

const GroupPreviewCardHeader: FC<Props> = ({account}: Props) => {
  const classes = groupCardHeaderStyles();
  const {obj: group} = useGroupViewContext();

  return (
    <Link to={Routes.GROUPS + '/' + group.id}>
      <CardHeader
        title={
          <Box className={classes.title}>
            {group.imageFilename && <UrlPic url={group.imageFilename} size="md" />}
            <Typography variant="h6" className={classes.caption}>
              {group.title}
            </Typography>
          </Box>
        }
        action={<GroupPreviewCardActions account={account} />}
        className={classes.root}
      />
    </Link>
  );
};

export default GroupPreviewCardHeader;
