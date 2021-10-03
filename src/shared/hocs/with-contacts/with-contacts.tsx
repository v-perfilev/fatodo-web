import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import ContactService from '../../../services/contact.service';
import {ContactRelation} from '../../../models/contact-relation.model';
import {ContactRequest} from '../../../models/contact-request.model';
import {ContactContext} from '../../contexts/contact-contexts/contact-context';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {flowRight} from 'lodash';
import withAuthState from '../with-auth-state/with-auth-state';

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = AuthState & BaseProps;

const withContacts = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const {handleResponse} = useSnackContext();
  const [relations, setRelations] = useState<ContactRelation[]>([]);
  const [outcomingRequests, setOutcomingRequests] = useState<ContactRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [relationsLoading, setRelationsLoading] = useState<boolean>(false);
  const [outcomingRequestsLoading, setOutcomingRequestsLoading] = useState<boolean>(false);
  const [incomingRequestsLoading, setIncomingRequestsLoading] = useState<boolean>(false);

  const loadRelations = (): void => {
    setRelationsLoading(true);
    ContactService.getAllRelations()
      .then((response) => {
        setRelations(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setRelationsLoading(false);
      });
  };

  const loadOutcomingRequests = (): void => {
    setOutcomingRequestsLoading(true);
    ContactService.getOutcomingRequests()
      .then((response) => {
        setOutcomingRequests(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setOutcomingRequestsLoading(false);
      });
  };

  const loadIncomingRequests = (): void => {
    setIncomingRequestsLoading(true);
    ContactService.getIncomingRequests()
      .then((response) => {
        setIncomingRequests(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIncomingRequestsLoading(false);
      });
  };

  const update = (): void => {
    if (isAuthenticated) {
      loadRelations();
      loadOutcomingRequests();
      loadIncomingRequests();
    }
  };

  useEffect(() => {
    update();
  }, [isAuthenticated]);

  useEffect(() => {
    setLoading(relationsLoading || outcomingRequestsLoading || incomingRequestsLoading);
  }, [relationsLoading, outcomingRequestsLoading, incomingRequestsLoading]);

  const context = {relations, outcomingRequests, incomingRequests, update, loading};

  return (
    <ContactContext.Provider value={context}>
      <Component {...props} />
    </ContactContext.Provider>
  );
};

export default flowRight([withAuthState, withContacts]);
