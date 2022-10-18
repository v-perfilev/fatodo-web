import React from 'react';
import {Paper, PaperProps} from '@mui/material';

type PaperBoxProps = PaperProps;

const PaperBox = ({children, ...props}: PaperBoxProps) => {
  return <Paper {...props}>{children}</Paper>;
};

// const paperBoxStyles = makeStyles((theme: Theme) => ({
//   root: {
//     display: 'inline-flex',
//     paddingTop: theme.spacing(0.5),
//     paddingBottom: theme.spacing(0.5),
//     paddingLeft: theme.spacing(1),
//     paddingRight: theme.spacing(1),
//   },
// }));

export default PaperBox;
