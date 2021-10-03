import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactRelationsListStyles} from './_styles';
import ContactRelationsItem from './contact-relations-item';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {PageDivider} from '../../../components/surfaces';
import ContactRelationsStub from './contact-relations-stub';

type Props = {
  relations: ContactRelationWithUser[];
  loadRelations: () => void;
};

const ContactRelationsList: FC<Props> = ({relations, loadRelations}: Props) => {
  const classes = contactRelationsListStyles();

  return (
    <Box className={classes.root}>
      {relations.length === 0 && <ContactRelationsStub />}
      {relations.length > 0 &&
        relations.map((relation, index) => (
          <Box key={index}>
            {index !== 0 && <PageDivider />}
            <ContactRelationsItem relation={relation} loadRelations={loadRelations} />
          </Box>
        ))}
    </Box>
  );
};

export default ContactRelationsList;
