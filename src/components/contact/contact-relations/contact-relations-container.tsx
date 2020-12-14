import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {contactRelationsContainerStyles} from './_styles';
import ContactRelationsFilter from './contact-relations-filter';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import ContactRelationsList from './contact-relations-list';

type Props = {
  relations: ContactRelationWithUser[];
  loadRelations: () => void;
};

const ContactRelationsContainer: FC<Props> = ({relations, loadRelations}: Props) => {
  const classes = contactRelationsContainerStyles();
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  useEffect(() => {
    setRelationsToShow(relations);
  }, [relations]);

  return (
    <Box className={classes.root}>
      <ContactRelationsFilter relations={relations} setRelationsToShow={setRelationsToShow} />
      <ContactRelationsList relations={relationsToShow} loadRelations={loadRelations} />
    </Box>
  );
};

export default ContactRelationsContainer;
