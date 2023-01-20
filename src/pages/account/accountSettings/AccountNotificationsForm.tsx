import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import {UserAccount, UserNotifications} from '../../../models/User';
import {AuthActions} from '../../../store/auth/authActions';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import LoadingButton from '../../../components/controls/LoadingButton';
import {EventType} from '../../../models/Event';
import FormikSwitchInput from '../../../components/inputs/FormikSwitchInput';
import PageSubtitle from '../../../components/layouts/PageSubtitle';

export interface AccountNotificationsFormValues {
  emailReminder: boolean;
  pushItemCreate: boolean;
  pushItemGroupCreate: boolean;
  pushItemMemberAdd: boolean;
  pushChatCreate: boolean;
  pushChatMessageCreate: boolean;
  pushChatReactionIncoming: boolean;
  pushContactRequestIncoming: boolean;
  pushContactAcceptOutcoming: boolean;
  pushCommentCreate: boolean;
  pushCommentReactionIncoming: boolean;
}

const defaultAccountNotificationsFormValues: Readonly<AccountNotificationsFormValues> = {
  emailReminder: false,
  pushItemCreate: false,
  pushItemGroupCreate: false,
  pushItemMemberAdd: false,
  pushChatCreate: false,
  pushChatMessageCreate: false,
  pushChatReactionIncoming: false,
  pushContactRequestIncoming: false,
  pushContactAcceptOutcoming: false,
  pushCommentCreate: false,
  pushCommentReactionIncoming: false,
};

const notificationsToFormValues = ({
  emailNotifications,
  pushNotifications,
}: UserNotifications): AccountNotificationsFormValues => ({
  emailReminder: emailNotifications?.includes(EventType.REMINDER),
  pushItemCreate: pushNotifications?.includes(EventType.ITEM_CREATE),
  pushItemGroupCreate: pushNotifications?.includes(EventType.ITEM_GROUP_CREATE),
  pushItemMemberAdd: pushNotifications?.includes(EventType.ITEM_MEMBER_ADD),
  pushChatCreate: pushNotifications?.includes(EventType.CHAT_CREATE),
  pushChatMessageCreate: pushNotifications?.includes(EventType.CHAT_MESSAGE_CREATE),
  pushChatReactionIncoming: pushNotifications?.includes(EventType.CHAT_REACTION_INCOMING),
  pushContactRequestIncoming: pushNotifications?.includes(EventType.CONTACT_REQUEST_INCOMING),
  pushContactAcceptOutcoming: pushNotifications?.includes(EventType.CONTACT_ACCEPT_OUTCOMING),
  pushCommentCreate: pushNotifications?.includes(EventType.COMMENT_CREATE),
  pushCommentReactionIncoming: pushNotifications?.includes(EventType.COMMENT_REACTION_INCOMING),
});

const formValuesToNotifications = (values: AccountNotificationsFormValues): UserNotifications => {
  const notifications: UserNotifications = {emailNotifications: [], pushNotifications: []};
  values.emailReminder && notifications.emailNotifications.push(EventType.REMINDER);
  values.pushItemCreate && notifications.pushNotifications.push(EventType.ITEM_CREATE);
  values.pushItemGroupCreate && notifications.pushNotifications.push(EventType.ITEM_GROUP_CREATE);
  values.pushItemMemberAdd && notifications.pushNotifications.push(EventType.ITEM_MEMBER_ADD);
  values.pushChatCreate && notifications.pushNotifications.push(EventType.CHAT_CREATE);
  values.pushChatMessageCreate && notifications.pushNotifications.push(EventType.CHAT_MESSAGE_CREATE);
  values.pushChatReactionIncoming && notifications.pushNotifications.push(EventType.CHAT_REACTION_INCOMING);
  values.pushContactRequestIncoming && notifications.pushNotifications.push(EventType.CONTACT_REQUEST_INCOMING);
  values.pushContactAcceptOutcoming && notifications.pushNotifications.push(EventType.CONTACT_ACCEPT_OUTCOMING);
  values.pushCommentCreate && notifications.pushNotifications.push(EventType.COMMENT_CREATE);
  values.pushCommentReactionIncoming && notifications.pushNotifications.push(EventType.COMMENT_REACTION_INCOMING);
  return notifications;
};

const initialValues = (account: UserAccount): AccountNotificationsFormValues =>
  account?.notifications ? notificationsToFormValues(account.notifications) : defaultAccountNotificationsFormValues;

const AccountNotificationsForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupList = (): void => navigate(GroupRouteUtils.getListUrl());

  const values = useMemo(() => initialValues(account), [account]);

  const handleSubmit = (
    values: AccountNotificationsFormValues,
    helpers: FormikHelpers<AccountNotificationsFormValues>,
  ): void => {
    const notifications = formValuesToNotifications(values);
    dispatch(AuthActions.updateAccountNotificationsThunk(notifications))
      .unwrap()
      .then(() => goToGroupList())
      .catch(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <FVStack>
          <PageSubtitle subtitle={t('account:settings.labels.email')} />

          <FormikSwitchInput
            name="emailReminder"
            label={t('account:settings.notifications.reminder')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />

          <PageSubtitle subtitle={t('account:settings.labels.push')} />

          <FormikSwitchInput
            name="pushItemCreate"
            label={t('account:settings.notifications.itemCreate')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushItemGroupCreate"
            label={t('account:settings.notifications.itemGroupCreate')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushItemMemberAdd"
            label={t('account:settings.notifications.itemMemberAdd')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushChatCreate"
            label={t('account:settings.notifications.chatCreate')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushChatMessageCreate"
            label={t('account:settings.notifications.chatMessageCreate')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushChatReactionIncoming"
            label={t('account:settings.notifications.chatReactionIncoming')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushContactRequestIncoming"
            label={t('account:settings.notifications.contactRequestIncoming')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushContactAcceptOutcoming"
            label={t('account:settings.notifications.contactAcceptOutcoming')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushCommentCreate"
            label={t('account:settings.notifications.commentCreate')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />
          <FormikSwitchInput
            name="pushCommentReactionIncoming"
            label={t('account:settings.notifications.commentReactionIncoming')}
            disabled={formikProps.isSubmitting}
            fullWidth
          />

          <FHStack flexGrow={0} justifyContent="flex-end">
            <LoadingButton
              variant="text"
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('account:actions.save')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default memo(AccountNotificationsForm);
