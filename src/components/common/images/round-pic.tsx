import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Avatar} from '@material-ui/core';
import csx from 'classnames';
import {roundPicStyles} from './_styles';
import {ImageUtils} from '../../../shared/utils/image.utils';
import FallbackPic from './fallback-pic';
import {ColorScheme, ColorSchemeUtils} from '../../../shared/utils/color-scheme.utils';

type Props = HTMLAttributes<any> & {
  url: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: ColorScheme;
  variant?: 'primary' | 'secondary';
  border?: number;
};

const RoundPic: FC<Props> = (props: Props) => {
  const classes = roundPicStyles();
  const {url, alt, className} = props;
  const {size = 'sm', border = 0, variant = 'primary', color} = props;

  const sizeClassName = csx(
    {[classes.xs]: size === 'xs'},
    {[classes.sm]: size === 'sm'},
    {[classes.md]: size === 'md'},
    {[classes.lg]: size === 'lg'},
  );

  const borderClassName = variant === 'primary'
    ? ColorSchemeUtils.getPrimaryBorderClass(color)
    : ColorSchemeUtils.getSecondaryBorderClass(color);

  const classNames = csx(classes.root, sizeClassName, borderClassName, className);

  const styles = {borderWidth: border};

  const src = size === 'lg'
    ? ImageUtils.getImage(url)
    : ImageUtils.getThumbnail(url);

  return (
    <Avatar alt={alt} src={src} className={classNames} style={styles}>
      <FallbackPic />
    </Avatar>
  );
};

export default RoundPic;
