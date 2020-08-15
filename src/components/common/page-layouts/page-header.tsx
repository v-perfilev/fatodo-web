import React, {FC, HTMLAttributes} from 'react';
import {Box, Typography} from '@material-ui/core';
import PageDivider from './page-divider';
import {pageHeaderStyles} from './_styles';
import {GradientColor} from '../../../shared/utils/color.utils';
import csx from 'classnames';
import PaperBox from './paper-box';

type Props = HTMLAttributes<any> & {
  title: string;
  subtitle?: string;
  color: GradientColor;
}

const PageHeader: FC<Props> = ({title, subtitle, color, className}: Props) => {
  const classes = pageHeaderStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Box className={classes.titleBox}>
        <Typography variant="h6" color="primary">
          <Box fontWeight="fontWeightMedium">
            {title}
          </Box>
        </Typography>
        {subtitle && (
          <PaperBox text={subtitle} />
        )}
      </Box>
      <PageDivider color={color} height={5} />
    </Box>
  );
};

export default PageHeader;
