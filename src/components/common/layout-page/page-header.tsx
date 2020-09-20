import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';
import csx from 'classnames';
import RoundPic from '../images/round-pic';

type Props = HTMLAttributes<any> & {
  title: ReactNode;
  imageFilename?: string;
};

const PageHeader: FC<Props> = ({title, imageFilename, className}: Props) => {
  const classes = pageHeaderStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      {imageFilename && <RoundPic url={imageFilename} size="md" border={2} />}
      <Typography variant="h6">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};

export default PageHeader;
