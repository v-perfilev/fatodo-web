import React, {useCallback, useState} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import UserView from '../../../components/views/UserView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRequest} from '../../../models/Contact';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenu';
import {useTranslation} from 'react-i18next';

type OutcomingRequestListItemProps = {
  request: ContactRequest;
};

const OutcomingRequestListItem = ({request}: OutcomingRequestListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => userSelector(state, request.recipientId));
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.removeOutcomingRequestThunk(request.recipientId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements: PageMenuItem[] = [
    {
      action: removeRequest,
      text: t('contact:outcoming.remove'),
      icon: <UserMinusIcon />,
      color: 'error',
      disabled: disabled,
    },
  ];

  return (
    <FHStack>
      <FHStack>
        <UserView user={user} withUsername />
      </FHStack>
      <PageMenu items={menuElements} />
    </FHStack>
  );
};

export default OutcomingRequestListItem;
