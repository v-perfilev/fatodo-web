import React, {FC, useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import {messageMainStyles} from './_styles';
import {compose} from 'recompose';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';


const MessageMain: FC = () => {
  const classes = messageMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return (
    <>

    </>
  );
};

export default compose(withVerticalPadding)(MessageMain);
