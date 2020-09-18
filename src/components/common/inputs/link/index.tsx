import {Link as RouterLink, LinkProps} from 'react-router-dom';
import * as React from 'react';
import {FC} from 'react';
import {Link as MaterialLink, LinkProps as MaterialLinkProps} from '@material-ui/core';

type Props = LinkProps & MaterialLinkProps & {
  underline?: boolean;
};

const Link: FC<Props> = ({underline, to, children, ...props}: Props) => {
  return (
    <MaterialLink {...props} component={RouterLink} to={to} underline={underline ? 'hover' : 'none'}>
      {children}
    </MaterialLink>
  );
};

export default Link;
