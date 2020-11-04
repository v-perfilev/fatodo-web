import React, {FC, useEffect, useState} from 'react';
import {Container} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import ContactService from '../../../services/contact.service';
import {ContactRelation} from '../../../models/contact-relation.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {PageHeader} from '../../common/surfaces/page-header';
import {PageDivider} from '../../common/surfaces/page-divider';
import {CircularSpinner} from '../../common/loaders/circular-spinner';
import {contactListStyles} from './_styles';
import UserService from '../../../services/user.service';
import {User} from '../../../models/user.model';

const ContactList: FC = () => {
  const classes = contactListStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {updateMenu} = useAdditionalMenuContext();
  const [relations, setRelations] = useState<ContactRelation[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const loadRelations = (): void => {
    ContactService.getAllRelations()
      .then((response) => {
        setRelations(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    const userIds = relations.map(r => r.id);
    UserService.getAllByIds(userIds)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="primary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    loadRelations();
  }, []);

  useEffect(() => {
    if (relations.length > 0) {
      loadUsers();
    }
  }, [relations]);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return users.length ? (
    <Container className={classes.root} maxWidth="sm">
      <PageHeader title={t('contact:contact-list.title')} />
      <PageDivider height={5} />

    </Container>
  ) : (
    <CircularSpinner />
  );
};

export default ContactList;
