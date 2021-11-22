import {Link as RouterLink, LinkProps} from 'react-router-dom';
import * as React from 'react';
import {FC} from 'react';
import {Link as MaterialLink, LinkProps as MaterialLinkProps} from '@material-ui/core';

type Props = LinkProps &
  MaterialLinkProps & {
    withUnderline?: boolean;
  };

export const Link: FC<Props> = ({withUnderline, children, ...props}: Props) => {
  const href = props.to?.toString();
  const isExternalLink = href?.startsWith('http');

  return isExternalLink ? (
    <MaterialLink {...props} href={href} component="a" underline={withUnderline ? 'hover' : 'none'}>
      {children}
    </MaterialLink>
  ) : (
    <MaterialLink {...props} component={RouterLink} underline={withUnderline ? 'hover' : 'none'}>
      {children}
    </MaterialLink>
  );
};
