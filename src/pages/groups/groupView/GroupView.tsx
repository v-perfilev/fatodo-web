import React from 'React';
import {useCallback} from 'react';
import {ListChildComponentProps} from 'react-window';
import {Box} from '@mui/material';
import VirtualizedList from '../../../components/layouts/virtualizedList/VirtualizedList';

const GroupView = () => {
  const data: {key: string; value: string}[] = Array.from({length: 100}).map((_, index) => {
    const value = index % 2 === 0 ? '#aa5566' : '#1199bb';
    return {key: String(index), value};
  });

  const keyExtractor = useCallback((index: number): string => {
    return String(index);
  }, []);

  const itemRenderer = useCallback(({data, index}: ListChildComponentProps<{key: string; value: string}[]>) => {
    return <Box bgcolor={data[index].value} width="100%" height="100px" />;
  }, []);

  return <VirtualizedList itemRenderer={itemRenderer} keyExtractor={keyExtractor} itemData={data} itemCount={100} />;
};

export default GroupView;
