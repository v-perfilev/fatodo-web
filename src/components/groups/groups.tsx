import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {TEST_GROUP} from './_constants';
import GroupPreviewGridContainer from './group-preview-grid/group-preview-grid-container';
import GroupsMenu from './groups-menu';
import {groupsStyles} from './_styles';
import {Box} from '@material-ui/core';

const initGroups = Array.from(Array(200).keys()).map(() => {
  return TEST_GROUP;
});

const Groups: FC = () => {
  const classes = groupsStyles();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  return (
    <Box className={classes.root}>
      <GroupPreviewGridContainer groups={groups} />
    </Box>
    //   <GroupsMenu />
    //   <Box className={classes.content}>
    //     <GroupPreviewGridContainer groups={groups} />
    //     {/*return <GroupGridContainer groups={groups} />*/}
    //   </Box>
  );
};

export default Groups;
