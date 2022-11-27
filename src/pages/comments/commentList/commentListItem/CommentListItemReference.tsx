import React, {useCallback} from 'react';
import {ReferenceComment} from '../../../../models/Comment';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import FHStack from '../../../../components/boxes/FHStack';
import {useTranslation} from 'react-i18next';
import DateView from '../../../../components/views/DateView';
import {Typography} from '@mui/material';

type CommentListItemReferenceProps = {
  reference: ReferenceComment;
};

const CommentListItemReference = ({reference}: CommentListItemReferenceProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, reference.userId));

  const date = new Date(reference.createdAt);

  return (
    <FHStack spacing={1}>
      <Typography color="grey.400" fontWeight="bold" fontSize={12}>
        {t('comment:list.reference')}:
      </Typography>
      <Typography color="grey.600" fontWeight="bold" fontSize={12}>
        {user?.username}, <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
      </Typography>
    </FHStack>
  );
};

export default CommentListItemReference;
