import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {paperBoxStyles} from './_styles';
import {Paper} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  children: ReactNode;
}

const PaperBox: FC<Props> = ({children, className}: Props) => {
  const classes = paperBoxStyles();
  const classNames = csx(classes.root, className);

  return (
    <Paper square className={classNames}>
      {children}
    </Paper>
  );
};

export default PaperBox;
