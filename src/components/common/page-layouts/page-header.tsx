import React, {FC, HTMLAttributes} from 'react';
import {Box, Typography} from '@material-ui/core';
import PageDivider from './page-divider';
import {pageHeaderStyles} from './_styles';
import {GradientColor} from '../../../shared/utils/color.utils';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  title: string;
  color: GradientColor;
}

const PageHeader: FC<Props> = ({title, color, className}: Props) => {
  const classes = pageHeaderStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Typography variant="h6" color="primary">
        <Box fontWeight="fontWeightMedium">
          {title}
        </Box>
      </Typography>
      <PageDivider color={color} height={5} />
    </Box>
  );
};

export default PageHeader;
