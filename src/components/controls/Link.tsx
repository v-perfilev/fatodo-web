import React from 'react';
import {Link as RouterLink, LinkProps as ReactLinkProps} from 'react-router-dom';
import {Link as MaterialLink, LinkBaseProps} from '@mui/material';

type LinkProps = ReactLinkProps &
  LinkBaseProps & {
    withHoverUnderline?: boolean;
    withAlwaysUnderline?: boolean;
  };

const Link = ({withHoverUnderline, withAlwaysUnderline, children, ...props}: LinkProps) => {
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

export default Link;
