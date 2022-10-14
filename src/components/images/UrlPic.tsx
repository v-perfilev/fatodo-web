import React from 'react';
import FallbackPic from './FallbackPic';
import {FALLBACK_AVATAR} from '../../constants';
import {ImageUtils} from '../../shared/utils/ImageUtils';
import {Avatar, AvatarProps, SxProps} from '@mui/material';

type UrlPicProps = AvatarProps & {
  url: string;
  invertedBorder?: boolean;
};

const UrlPic = ({url, invertedBorder, ...props}: UrlPicProps) => {
  // TODO calculate size
  const src = url ? ImageUtils.buildImageUri(url, true) : FALLBACK_AVATAR;

  return (
    <Avatar sx={avatarStyles} src={src} {...props}>
      <FallbackPic />
    </Avatar>
  );
};

const avatarStyles: SxProps = {
  borderStyle: 'solid',
  borderColor: 'primary.main',
  backgroundColor: 'gray.50',
  '& img': {
    height: '100%',
  },
};

export default UrlPic;
