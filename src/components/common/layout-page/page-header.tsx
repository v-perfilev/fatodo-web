import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  title: ReactNode;
};

const PageHeader: FC<Props> = ({title, className}: Props) => {
  const classes = pageHeaderStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Typography variant="h6">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};

export default PageHeader;
