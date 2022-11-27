import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Comment, ReferenceComment} from '../../../models/Comment';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import FHStack from '../../../components/boxes/FHStack';
import CloseIcon from '../../../components/icons/CloseIcon';
import DateView from '../../../components/views/DateView';
import {IconButton, Typography} from '@mui/material';

type CommentListReferenceProps = {
  reference: ReferenceComment;
  setReference: (reference: Comment) => void;
};

const CommentListReference = ({reference, setReference}: CommentListReferenceProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, reference.userId));

  const clearReference = (): void => {
    setReference(null);
  };

  const date = new Date(reference.createdAt);

  return (
    <FHStack>
      <Typography color="grey.400" fontWeight="bold" fontSize={12}>
        {t('comment:list.reference')}:
      </Typography>
      <Typography fontWeight="bold" fontSize={12}>
        {user.username}, <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
      </Typography>
      <IconButton sx={{width: 8, height: 8, overflow: 'hidden'}} onClick={clearReference}>
        <CloseIcon />
      </IconButton>
    </FHStack>
  );
};

export default CommentListReference;
