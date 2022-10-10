import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactRelationsListStyles} from './_styles';
import ContactRelationsItem from './contact-relations-item';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';

type Props = {
  relations: ContactRelationWithUser[];
};

const ContactRelationsList: FC<Props> = ({relations}: Props) => {
  const classes = contactRelationsListStyles();

  return (
    <Box className={classes.root}>
      {relations.map((relation) => (
        <Box key={relation.id}>
          <ContactRelationsItem relation={relation} />
        </Box>
      ))}
    </Box>
  );
};

export default ContactRelationsList;
