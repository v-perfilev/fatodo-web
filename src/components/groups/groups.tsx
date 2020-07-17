import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {TEST_GROUP} from './_constants';
import GroupPreviewGridContainer from './group-preview-grid/group-preview-grid-container';
import ContainerWithSidebar from '../sidebar-menu/container-with-sidebar';

const initGroups = Array.from(Array(50).keys()).map(() => {
  return TEST_GROUP;
});

const Groups: FC = () => {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  return (
    <ContainerWithSidebar menu={<>Test</>} content={<GroupPreviewGridContainer groups={groups} />} />
  );
};

export default Groups;
