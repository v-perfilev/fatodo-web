import React, {memo} from 'react';
import {CONTACT_SKELETON_HEIGHT, HEADER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import ContactSkeleton from './ContactSkeleton';
import FVStack from '../../../components/boxes/FVStack';
import PageDivider from '../../../components/layouts/PageDivider';
import {Box} from '@mui/material';

const ContactListSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT;
  const count = Math.floor(height / CONTACT_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack spacing={0}>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <ContactSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(ContactListSkeleton);
