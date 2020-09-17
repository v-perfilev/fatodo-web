import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import GroupForm from '../group-form';
import {useHistory, useParams} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import GroupService from '../../../services/group.service';
import {NotificationUtils} from '../../../shared/utils/notification.utils';
import {enqueueSnackbar} from '../../../store/actions/notification.actions';

const mapDispatchToProps = {setMenu, enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupEdit: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
  const history = useHistory();
  const {groupId} = useParams();
  const [saveCallback, setSaveCallback] = useState(() => () => {
  });
  const [group, setGroup] = useState<Group>(null);

  const submit = (): void => saveCallback();
  const redirectToGroup = (): void => history.push(Routes.GROUPS + '/' + groupId);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(() => {
        redirectToGroup();
      });
  };

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
        action={redirectToGroup}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    loadGroup();
    setMenu(menu, true);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language, saveCallback]);

  const request = (data: FormData, stopSubmitting: () => void) => {
    GroupService.update(data)
      .then(() => {
        NotificationUtils.handleSnack('auth.afterResetPassword', 'info', enqueueSnackbar);
        redirectToGroup();
      })
      .catch((response) => {
        NotificationUtils.handleFeedback(response, '*', '', enqueueSnackbar);
        stopSubmitting();
      });
  };

  return group && (
    <GroupForm
      group={group}
      header={t('groups:headers.edit')}
      setSaveCallback={setSaveCallback}
      request={request}
    />
  );
};

export default compose(connector)(GroupEdit);
