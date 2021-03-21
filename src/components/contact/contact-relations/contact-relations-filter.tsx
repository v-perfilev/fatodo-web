import React, {ChangeEvent, FC} from 'react';
import {Box, TextField} from '@material-ui/core';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {contactRelationsFilterStyles} from './_styles';
import {useTranslation} from 'react-i18next';

type Props = {
  relations: ContactRelationWithUser[];
  setRelationsToShow: (relations: ContactRelationWithUser[]) => void;
};

const ContactRelationsFilter: FC<Props> = ({relations, setRelationsToShow}: Props) => {
  const classes = contactRelationsFilterStyles();
  const {t} = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const relationsToShow = relations.filter((r) => {
      const str = r.user.username + r.user.firstname + r.user.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(relationsToShow);
  };

  return (
    <Box className={classes.root}>
      <TextField className={classes.input} size="small" label={t('contact:relations.filter')} onChange={handleChange} />
    </Box>
  );
};

export default ContactRelationsFilter;
