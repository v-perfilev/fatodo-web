import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Avatar} from '@material-ui/core';
import csx from 'classnames';
import {roundPicStyles} from './_styles';
import {ImageUtils} from '../../../shared/utils/image.utils';
import FallbackPic from './fallback-pic';

type Props = HTMLAttributes<any> & {
  url: string;
  alt?: string;
  noBorder?: boolean;
  whiteBorder?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const RoundPic: FC<Props> = ({url, alt, noBorder, whiteBorder, size, className}: Props) => {
  const classes = roundPicStyles();
  const classNames = csx(
    classes.root,
    {[classes.xs]: size === 'xs'},
    {[classes.md]: size === 'md'},
    {[classes.lg]: size === 'lg'},
    {[classes.noBorder]: noBorder},
    {[classes.whiteBorder]: whiteBorder},
    className,
  );

  const src = size === 'lg'
    ? ImageUtils.getImage(url)
    : ImageUtils.getThumbnail(url);

  return (
    <Avatar alt={alt} src={src} className={classNames}>
      <FallbackPic />
    </Avatar>
  );
};

export default RoundPic;
