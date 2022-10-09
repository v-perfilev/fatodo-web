import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Avatar} from '@material-ui/core';
import csx from 'classnames';
import {urlPicStyles} from './_styles';
import {ImageUtils} from '../../../shared/utils/image.utils';
import {FallbackPic} from '../fallback-pic/fallback-pic';
import {SizeType} from '../types';
import {FALLBACK_AVATAR} from '../../../constants';

type Props = HTMLAttributes<HTMLElement> & {
  url: string;
  alt?: string;
  size?: SizeType;
  border?: number;
  variant?: 'circle' | 'rounded' | 'square';
  invertedBorder?: boolean;
};

export const UrlPic: FC<Props> = (props: Props) => {
  const classes = urlPicStyles();
  const {url, alt, size = 'sm', border = 0, variant, invertedBorder, className} = props;

  const getRemoteImage = (): string => (size === 'lg' ? ImageUtils.getImage(url) : ImageUtils.getThumbnail(url));
  const src = url ? getRemoteImage() : FALLBACK_AVATAR;

  const sizeClassName = csx(
    {[classes.xs]: size === 'xs'},
    {[classes.sm]: size === 'sm'},
    {[classes.md]: size === 'md'},
    {[classes.lg]: size === 'lg'},
    {[classes.xl]: size === 'xl'},
  );
  const classNames = csx(classes.root, sizeClassName, {[classes.invertedBorder]: invertedBorder}, className);
  const styles = {borderWidth: border};

  return (
    <Avatar alt={alt} src={src} variant={variant} className={classNames} style={styles}>
      <FallbackPic />
    </Avatar>
  );
};
