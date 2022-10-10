import React, {HTMLAttributes} from 'react';
import {Avatar, Theme} from '@material-ui/core';
import csx from 'classnames';
import FallbackPic from './FallbackPic';
import {FALLBACK_AVATAR} from '../../constants';
import {makeStyles} from '@material-ui/core/styles';
import {ImageUtils} from '../../shared/utils/ImageUtils';

export type PicSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type UrlPicProps = HTMLAttributes<HTMLElement> & {
  url: string;
  alt?: string;
  size?: PicSizeType;
  border?: number;
  variant?: 'circle' | 'rounded' | 'square';
  invertedBorder?: boolean;
};

const UrlPic = ({url, alt, size = 'sm', border = 0, variant, invertedBorder, className}: UrlPicProps) => {
  const classes = urlPicStyles();

  const getRemoteImage = (): string => ImageUtils.buildImageUri(url, size !== 'lg');
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

const urlPicStyles = makeStyles((theme: Theme) => ({
  root: {
    borderStyle: 'solid',
    borderColor: theme.palette.tertiary.main,
    backgroundColor: theme.palette.grey['50'],
    '& img': {
      height: '100%',
    },
  },
  xs: {
    width: 20,
    height: 20,
  },
  sm: {
    width: 35,
    height: 35,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 50,
    height: 50,
  },
  xl: {
    width: 100,
    height: 100,
  },
  invertedBorder: {
    borderColor: theme.palette.tertiary.contrastText,
  },
}));

export default UrlPic;
