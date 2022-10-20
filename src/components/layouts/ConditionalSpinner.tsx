import React, {memo, PropsWithChildren, ReactElement} from 'react';
import FBox from '../boxes/FBox';
import {BoxProps} from '@mui/material';
import FatodoSpinner from '../loaders/FatodoSpinner';

type ConditionalSpinnerProps = BoxProps &
  PropsWithChildren<{
    loading: boolean;
    loadingPlaceholder?: ReactElement;
  }>;

const ConditionalLoader = ({loading, loadingPlaceholder, children, ...props}: ConditionalSpinnerProps) => {
  const loader = loadingPlaceholder ? <FBox {...props}>{loadingPlaceholder}</FBox> : <FatodoSpinner />;

  return loading ? <>{loader}</> : <>{children}</>;
};

export default memo(ConditionalLoader);
