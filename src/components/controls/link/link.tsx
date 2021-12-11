import {Link as RouterLink, LinkProps} from 'react-router-dom';
import * as React from 'react';
import {FC} from 'react';
import {Link as MaterialLink, LinkProps as MaterialLinkProps} from '@material-ui/core';

type Props = LinkProps &
  MaterialLinkProps & {
    withHoverUnderline?: boolean;
    withAlwaysUnderline?: boolean;
  };

export const Link: FC<Props> = ({withHoverUnderline, withAlwaysUnderline, children, ...props}: Props) => {
  const href = props.to?.toString();
  const isExternalLink = href?.startsWith('http');
  const underline = withAlwaysUnderline ? 'always' : withHoverUnderline ? 'hover' : 'none';

  const externalLink = (
    <MaterialLink {...props} href={href} component="a" underline={underline}>
      {children}
    </MaterialLink>
  );

  const internalLink = (
    <MaterialLink {...props} component={RouterLink} underline={underline}>
      {children}
    </MaterialLink>
  );

  return isExternalLink ? externalLink : internalLink;
};
