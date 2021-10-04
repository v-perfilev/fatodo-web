import React, {FC, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import ContactRelationsList from './contact-relations-list';
import ContactRelationsStub from './contact-relations-stub';

type Props = {
  relations: ContactRelationWithUser[];
  loadRelations: () => void;
  filter: string;
};

const ContactRelationsContainer: FC<Props> = ({relations, loadRelations, filter}: Props) => {
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const str = r.user.username + r.user.firstname + r.user.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  return (
    <>
      {relations.length === 0 && <ContactRelationsStub />}
      {relations.length > 0 && <ContactRelationsList relations={relationsToShow} loadRelations={loadRelations} />}
    </>
  );
};

export default ContactRelationsContainer;
