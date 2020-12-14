import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';

type Props = {
  relations: ContactRelationWithUser[];
  setRelationsToShow: (relations: ContactRelationWithUser[]) => void;
};

const ContactRelationsFilter: FC<Props> = ({}: Props) => {
  return <Box>Filter</Box>;
};

export default ContactRelationsFilter;
