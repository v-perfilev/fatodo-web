import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import ContactService from '../../../services/contact.service';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {flowRight} from 'lodash';
import withAuthState from '../with-auth-state/with-auth-state';
import {ContactInfoContext} from '../../contexts/contact-contexts/contact-info-context';

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = AuthState & BaseProps;

const withContactInfo = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const {handleResponse} = useSnackContext();
  const [relationCount, setRelationCount] = useState<number>(0);
  const [outcomingRequestCount, setOutcomingRequestCount] = useState<number>(0);
  const [incomingRequestCount, setIncomingRequestCount] = useState<number>(0);

  const loadInfo = (): void => {
    ContactService.getInfo()
      .then((response) => {
        const contactInfo = response.data;
        setRelationCount(contactInfo.relationCount);
        setOutcomingRequestCount(contactInfo.outcomingRequestCount);
        setIncomingRequestCount(contactInfo.incomingRequestCount);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const update = (): void => {
    if (isAuthenticated) {
      loadInfo();
    }
  };

  useEffect(() => {
    update();
  }, [isAuthenticated]);

  const context = {relationCount, outcomingRequestCount, incomingRequestCount, update};

  return (
    <ContactInfoContext.Provider value={context}>
      <Component {...props} />
    </ContactInfoContext.Provider>
  );
};

export default flowRight([withAuthState, withContactInfo]);
