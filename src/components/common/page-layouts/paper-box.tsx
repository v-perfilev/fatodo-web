import React, {FC, HTMLAttributes} from 'react';
import {paperBoxStyles} from './_styles';
import {Paper, Typography} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  text: string;
}

const PaperBox: FC<Props> = ({text, className}: Props) => {
  const classes = paperBoxStyles();
  const classNames = csx(classes.root, className);

  return (
    <Paper square className={classNames}>
      <Typography variant="body2">{text}</Typography>
    </Paper>
  );
};

export default PaperBox;
