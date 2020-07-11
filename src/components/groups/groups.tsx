import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {TEST_GROUP} from './_constants';
import GroupGridContainer from './group-grid/group-grid-container';

const initGroups = Array.from(Array(5).keys()).map((value) => {
  return TEST_GROUP;
});

const Groups: FC = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  return <GroupGridContainer groups={groups} />;
};

export default Groups;
