import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {TEST_GROUP} from './_constants';
import GroupPreviewGridContainer from './group-preview-grid/group-preview-grid-container';

const initGroups = Array.from(Array(5).keys()).map(() => {
  return TEST_GROUP;
});

const Groups: FC = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  return <GroupPreviewGridContainer groups={groups} />;
  // return <GroupGridContainer groups={groups} />;
};

export default Groups;
