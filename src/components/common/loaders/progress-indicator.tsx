import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import {progressIndicatorStyles} from './_styles';
import classNames from 'classnames';

interface ComponentProps {
  component?: ReactElement;
  transparent?: boolean;
  hide?: boolean;
  center?: boolean;
}

type Props = ComponentProps;

const ProgressIndicator: FC<Props> = ({transparent, hide, center, ...props}: Props) => {
  const classes = progressIndicatorStyles();
  const component = !!props.component ? props.component : <CircularProgress color={'secondary'} />;

  return (
    <Box
      className={classNames(
        {[classes.center]: !!center},
        {[classes.transparent]: !!transparent},
        {[classes.hide]: !!hide}
      )}
    >
      {component}
    </Box>
  );
};

export default ProgressIndicator;
