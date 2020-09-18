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
  size?: 'small' | 'normal' | 'big';
};

const RoundPic: FC<Props> = ({url, alt, size, className}: Props) => {
  const classes = roundPicStyles();
  const classNames = csx(
    classes.root,
    {[classes.small]: size === 'small'},
    {[classes.big]: size === 'big'},
    className,
  );

  const src = size === 'big'
    ? ImageUtils.getImage(url)
    : ImageUtils.getThumbnail(url);

  return (
    <Avatar alt={alt} src={src} className={classNames}>
      <FallbackPic />
    </Avatar>
  );
};

export default RoundPic;
