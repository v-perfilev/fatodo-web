import React, {useCallback, useState} from 'react';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRequest} from '../../../models/Contact';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenuProps';
import {useTranslation} from 'react-i18next';

type IncomingRequestListItemProps = {
  request: ContactRequest;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => userSelector(state, request.requesterId));
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.acceptIncomingRequestThunk(request.requesterId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const declineRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.declineIncomingRequestThunk(request.requesterId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const men: PageMenuItem[] = [
    {
      action: acceptRequest,
      text: t('contact:incoming.accept'),
      icon: <CheckIcon />,
      disabled: disabled,
    },
    {
      action: declineRequest,
      text: t('contact:incoming.decline'),
      icon: <CloseIcon />,
      color: 'error',
      disabled: disabled,
    },
  ];

  return (
    <FHStack>
      <FHStack>
        <UserView user={user} withUsername />
      </FHStack>
      <PageMenu items={men} fullView />
    </FHStack>
  );
};

export default IncomingRequestListItem;
