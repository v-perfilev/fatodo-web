import React, {FC, memo, useState} from 'react';
import {Box} from '@material-ui/core';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {UserWithPopupView} from '../../../components/views';
import {LoadingButton} from '../../../components/controls';
import {contactRelationsItemStyles} from './_styles';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useTranslation} from 'react-i18next';
import ContactService from '../../../services/contact.service';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';

type Props = {
  relation: ContactRelationWithUser;
};

const ContactRelationsItem: FC<Props> = ({relation}: Props) => {
  const classes = contactRelationsItemStyles();
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    ContactService.removeRelation(relation.user.id)
      .then(() => {
        handleCode('contact.relationRemoved', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setDisabled(false);
      });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.body}>
        <UserWithPopupView user={relation.user} withUsername picSize="sm" />
      </Box>
      <Box className={classes.managementBox}>
        <LoadingButton color="secondary" size="medium" disabled={disabled} onClick={removeRelation}>
          {t('contact:relations.remove')}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default memo(ContactRelationsItem);
