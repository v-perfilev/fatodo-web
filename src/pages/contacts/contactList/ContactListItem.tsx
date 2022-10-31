import React, {useCallback, useState} from 'react';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenuProps';
import {useTranslation} from 'react-i18next';

type ContactListItemProps = {
  relation: ContactRelation;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => userSelector(state, relation.secondUserId));
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.removeRelationThunk(relation.secondUserId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuItems: PageMenuItem[] = [
    {
      action: removeRelation,
      text: t('contact:relations.remove'),
      icon: <UserMinusIcon />,
      color: 'error',
      disabled,
    },
  ];

  return (
    <FHStack>
      <FHStack>
        <UserView user={user} withUsername />
      </FHStack>
      <PageMenu items={menuItems} fullView />
    </FHStack>
  );
};

export default ContactListItem;
