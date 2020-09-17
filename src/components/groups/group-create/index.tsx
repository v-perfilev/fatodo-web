import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {compose} from 'recompose';
import GroupForm from '../group-form';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';
import GroupService from '../../../services/group.service';
import {NotificationUtils} from '../../../shared/utils/notification.utils';
import {enqueueSnackbar} from '../../../store/actions/notification.actions';

const mapDispatchToProps = {setMenu, enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupCreate: FC<Props> = ({setMenu, enqueueSnackbar}: Props) => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const [saveCallback, setSaveCallback] = useState<() => void>(() => () => {
  });

  const submit = (): void => saveCallback();
  const redirectToGroup = (id: string): void => history.push(Routes.GROUPS + '/' + id);
  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={submit}
        color="primary"
        tooltip={t('groups:tooltips.ok')}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroups}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: FormData, stopSubmitting: () => void) => {
    GroupService.create(data)
      .then((response) => {
        NotificationUtils.handleSnack('auth.afterResetPassword', 'info', enqueueSnackbar);
        const id = response.data.id;
        redirectToGroup(id);
      })
      .catch((response) => {
        NotificationUtils.handleFeedback(response, '*', '', enqueueSnackbar);
        stopSubmitting();
      });
  };

  return (
    <GroupForm
      header={t('groups:headers.create')}
      setSaveCallback={setSaveCallback}
      request={request}
    />
  );
};

export default compose(connector)(GroupCreate);
