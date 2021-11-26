import React, {ChangeEvent, FC} from 'react';
import {Box, Fab} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {contactHeaderStyles} from './_styles';
import {ClearableTextInput} from '../../../components/inputs';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useContactDialogContext} from '../../../shared/contexts/dialog-contexts/contact-dialog-context';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';

type Props = {
  setFilter: (filter: string) => void;
};

const ContactHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = contactHeaderStyles();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const {showContactRequestDialog} = useContactDialogContext();
  const {t} = useTranslation();

  const openContactRequestDialog = (): void => {
    const onSuccess = (): void => {
      updateContacts();
      updateInfo();
    };
    showContactRequestDialog(onSuccess);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <Fab className={classes.button} size="small" color="primary" onClick={openContactRequestDialog}>
        <PlusIcon />
      </Fab>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} fullWidth />
    </Box>
  );
};

export default ContactHeader;
