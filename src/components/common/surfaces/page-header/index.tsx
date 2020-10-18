import React, {FC, ReactNode} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';
import {UrlPic} from '../../images';

type Props = {
  title: ReactNode;
  filename?: string;
};

export const PageHeader: FC<Props> = ({title, filename}: Props) => {
  const classes = pageHeaderStyles();

  return (
    <Box className={classes.root}>
      {filename && <UrlPic url={filename} size="md" border={2} />}
      <Typography variant="h6">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};
