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
  size?: 'xs' | 'sm' | 'md' | 'lg';
  border?: number;
};

const RoundPic: FC<Props> = (props: Props) => {
  const classes = roundPicStyles();
  const {url, alt, size = 'sm', border = 0, className} = props;

  const src = url ?
    size === 'lg'
      ? ImageUtils.getImage(url)
      : ImageUtils.getThumbnail(url)
    : '.';

  const sizeClassName = csx(
    {[classes.xs]: size === 'xs'},
    {[classes.sm]: size === 'sm'},
    {[classes.md]: size === 'md'},
    {[classes.lg]: size === 'lg'},
  );

  const classNames = csx(classes.root, sizeClassName, className);

  const styles = {borderWidth: border};

  return (
    <Avatar alt={alt} src={src} className={classNames} style={styles}>
      <FallbackPic />
    </Avatar>
  );
};

export default RoundPic;
