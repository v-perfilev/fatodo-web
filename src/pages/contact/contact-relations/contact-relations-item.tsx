import React, {FC, memo, useState} from 'react';
import {Box} from '@material-ui/core';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {UserWithPopupView} from '../../../components/views';
import {LoadingButton} from '../../../components/controls';
import {contactRelationsItemStyles} from './_styles';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useTranslation} from 'react-i18next';
import ContactService from '../../../services/contact.service';

type Props = {
  relation: ContactRelationWithUser;
  loadRelations: () => void;
};

const ContactRelationsItem: FC<Props> = ({relation, loadRelations}: Props) => {
  const classes = contactRelationsItemStyles();
  const {handleCode, handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    ContactService.removeRelation(relation.user.id)
      .then(() => {
        handleCode('contact.relationRemoved', 'info');
        loadRelations();
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
