import React from 'react';
import FallbackPic from './FallbackPic';
import {FALLBACK_AVATAR} from '../../constants';
import {ImageUtils} from '../../shared/utils/ImageUtils';
import {Avatar, AvatarProps, SxProps} from '@mui/material';

type UrlPicProps = AvatarProps & {
  url: string;
  size?: number;
};

const UrlPic = ({url, size = 40, ...props}: UrlPicProps) => {
  const isThumbnail = size < 100;
  const src = url ? ImageUtils.buildImageUri(url, isThumbnail) : FALLBACK_AVATAR;

  return (
    <Avatar sx={{...avatarStyles, width: size, height: size}} src={src} {...props}>
      <FallbackPic />
    </Avatar>
  );
};

const avatarStyles: SxProps = {
  borderStyle: 'solid',
  borderColor: 'primary.main',
  backgroundColor: 'gray.50',
};

export default UrlPic;
