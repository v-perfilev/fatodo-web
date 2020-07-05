import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {TEST_GROUP} from './_constants';
import GroupContainer from './group-list/group-container';
import {Button} from '@material-ui/core';

const initGroups = Array.from(Array(5).keys()).map((value) => {
  return TEST_GROUP;
});

const Groups: FC = () => {
  const [groups, setGroups] = useState([]);
  const [mode, setMode] = useState('normal');

  useEffect(() => {
    setGroups(initGroups);
  }, []);

  const toggleMode = (): void => setMode((prevState) => prevState === 'normal' ? 'dnd' : 'normal');

  return (
    <>
      <Button onClick={toggleMode}>Toggle</Button>
      <GroupContainer groups={groups} mode={mode} />
    </>
  );
};

export default Groups;
