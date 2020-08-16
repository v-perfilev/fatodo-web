import React, {FC, HTMLAttributes} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  title: string;
}

const PageHeader: FC<Props> = ({title, className}: Props) => {
  const classes = pageHeaderStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Typography variant="h6" color="primary">
        <Box fontWeight="fontWeightMedium">
          {title}
        </Box>
      </Typography>
    </Box>
  );
};

export default PageHeader;
