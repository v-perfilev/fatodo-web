import * as React from 'react';
import {FC} from 'react';
import {Box, CardHeader, Typography} from '@material-ui/core';
import {groupSortingCardHeaderStyles} from './_styles';
import GroupSortingActions from './group-sorting-actions';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UrlPic} from '../../../components/images';

type Props = {
  bind: (...any) => void;
};

const GroupSortingHeader: FC<Props> = ({bind}: Props) => {
  const classes = groupSortingCardHeaderStyles();
  const {obj: group} = useGroupViewContext();

  return (
    <CardHeader
      title={
        <Box className={classes.title}>
          {group.imageFilename && <UrlPic url={group.imageFilename} size="md" />}
          <Typography variant="h6" className={classes.caption}>
            {group.title}
          </Typography>
        </Box>
      }
      action={<GroupSortingActions bind={bind} />}
      className={classes.root}
    />
  );
};

export default GroupSortingHeader;
