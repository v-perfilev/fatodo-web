import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactRelationsListStyles} from './_styles';
import ContactRelationsItem from './contact-relations-item';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {PageDivider} from '../../common/surfaces';

type Props = {
  relations: ContactRelationWithUser[];
  loadRelations: () => void;
};

const ContactRelationsList: FC<Props> = ({relations, loadRelations}: Props) => {
  const classes = contactRelationsListStyles();

  return (
    <Box className={classes.root}>
      {relations.map((relation, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <ContactRelationsItem relation={relation} loadRelations={loadRelations} />
        </Box>
      ))}
    </Box>
  );
};

export default ContactRelationsList;
