import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import ContactService from '../../../services/contact.service';
import {ContactRelation} from '../../../models/contact-relation.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {CircularSpinner} from '../../common/loaders/circular-spinner';
import {contactListStyles} from './_styles';
import UserService from '../../../services/user.service';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {compose} from 'recompose';
import withUserList from '../../../shared/hoc/with-list/with-user-list';
import {Box} from '@material-ui/core';

const ContactList: FC = () => {
  const classes = contactListStyles();
  const {t} = useTranslation();
  const {handleResponse} = useSnackContext();
  const {setObjs: setUsers, setLoad: setUserLoad, loading: usersLoading} = useUserListContext();

  const loadRelations = (): Promise<ContactRelation[]> =>
    new Promise((resolve) => {
      ContactService.getAllRelations()
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          handleResponse(response);
          resolve([]);
        });
    });

  const loadUsersByIds = (ids: string[]): void => {
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    loadRelations().then((relations) => {
      const ids = relations.map((r) => r.id);
      if (ids.length > 0) {
        loadUsersByIds(ids);
      } else {
        setUsers([]);
      }
    });
  };

  useEffect(() => {
    setUserLoad(() => (): void => loadUsers());
  }, []);

  return usersLoading ? <CircularSpinner /> : <Box>Contact List</Box>;
};

export default compose(withUserList)(ContactList);
