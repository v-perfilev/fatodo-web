import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {Box, Typography} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';
import csx from 'classnames';
import {ColorScheme, ColorSchemeUtils} from '../../../shared/utils/color-scheme.utils';

type Props = HTMLAttributes<any> & {
  title: ReactNode;
  color?: ColorScheme;
};

const PageHeader: FC<Props> = ({title, color, className}: Props) => {
  const classes = pageHeaderStyles();
  const colorClassName = ColorSchemeUtils.getTitleClass(color);
  const classNames = csx(classes.root, colorClassName, className);

  return (
    <Box className={classNames}>
      <Typography variant="h6">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};

export default PageHeader;
