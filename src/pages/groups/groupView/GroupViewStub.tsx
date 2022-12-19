import React, {CSSProperties} from 'react';
import {useTranslation} from 'react-i18next';
import PageStub from '../../../components/layouts/PageStub';
import {Button} from '@mui/material';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useNavigate} from 'react-router-dom';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import {GroupUtils} from '../../../shared/utils/GroupUtils';

const GroupViewStub = () => {
  const group = useAppSelector(GroupSelectors.group);
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const navigate = useNavigate();

  const canEdit = group && GroupUtils.canEdit(account, group);

  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group?.id));

  return (
    <PageStub>
      <FVStack spacing={2} justifyContent="center" alignItems="center">
        <img style={imgStyles} alt="Fatodo Octopus" src={'/images/content-1.png'} />
        <Button variant="contained" color="primary" disabled={!canEdit} onClick={goToItemCreate}>
          {t('group:actions.createItem')}
        </Button>
      </FVStack>
    </PageStub>
  );
};

const imgStyles: CSSProperties = {
  width: 150,
  height: 150,
  opacity: 0.8,
};

export default GroupViewStub;
