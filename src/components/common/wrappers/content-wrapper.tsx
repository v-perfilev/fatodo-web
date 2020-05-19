import {CommonProps} from '@material-ui/core/OverridableComponent';
import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import {contentWrapperStyles} from '../_styles';

const useStyles = contentWrapperStyles;

const ContentWrapper: FC<CommonProps<any>> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>{props.children}</Box>
  );
};

export default ContentWrapper;
