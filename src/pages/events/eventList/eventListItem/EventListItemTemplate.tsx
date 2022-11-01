import React, {memo, ReactElement} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import DateView from '../../../../components/views/DateView';
import {SxProps, Typography} from '@mui/material';
import PaperBox from '../../../../components/boxes/PaperBox';
import EventSkeleton from '../../skeletons/EventSkeleton';

type EventListItemTemplateProps = {
  image?: ReactElement;
  title: string;
  content: ReactElement;
  message?: string;
  date: number;
  loading?: boolean;
};

const EventListItemTemplate = ({image, title, content, message, date, loading}: EventListItemTemplateProps) => {
  const dateToShow = new Date(date);

  const template = (
    <FHStack sx={containerStyles} alignItems="flex-start">
      {image}
      <FVStack spacing={1}>
        <FHStack>
          <FHStack>
            <Typography color="grey.500" fontWeight="bold" fontSize={14}>
              {title}
            </Typography>
          </FHStack>
          <Typography color="grey.400" fontWeight="bold" fontSize={12}>
            <DateView date={dateToShow} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
          </Typography>
        </FHStack>
        <Typography fontSize={14}>{content}</Typography>
        {message && (
          <PaperBox sx={paperStyles} elevation={0}>
            <Typography fontSize={12}>{message}</Typography>
          </PaperBox>
        )}
      </FVStack>
    </FHStack>
  );

  return loading ? <EventSkeleton /> : template;
};

const containerStyles: SxProps = {
  paddingX: 2,
  paddingY: 2,
};

const paperStyles: SxProps = {
  marginTop: 2,
  paddingY: 1,
  paddingX: 2,
  borderRadius: 3,
  backgroundColor: 'grey.50',
};

export default memo(EventListItemTemplate);
