import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import GroupForm from '../group-form';
import {useHistory, useParams} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import GroupService from '../../../services/group.service';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {GroupRouteUtils} from '../_router';
import {CircularSpinner} from '../../common/loaders/circular-spinner';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withGroupView from '../../../shared/hocs/with-view/with-group-view';
import {compose} from 'recompose';

const GroupEdit: FC = () => {
  const history = useHistory();
  const {groupId} = useParams();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const {handleCode, handleResponse} = useSnackContext();
  const {obj: group, setObj: setGroup, setLoad: setLoadGroup, loading: groupLoading} = useGroupViewContext();
  const [isSaving, setIsSaving] = useState(false);
  const [saveCallback, setSaveCallback] = useState<() => void>(() => (): void => {
    // important stub function
  });

  const redirectToGroupView = (): void => history.push(GroupRouteUtils.getViewUrl(groupId));
  const redirectToNotFound = (): void => history.push(Routes.PAGE_NOT_FOUND);

  const loadGroup = (): void => {
    GroupService.get(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((response) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404) {
          redirectToNotFound();
        }
        handleResponse(response);
        redirectToGroupView();
      });
  };

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    setIsSaving(true);
    GroupService.update(formData)
      .then(() => {
        handleCode('group.edited', 'info');
        redirectToGroupView();
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
        setIsSaving(false);
      });
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={saveCallback}
        color="primary"
        tooltip={t('group:tooltips.ok')}
        loading={isSaving}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={redirectToGroupView}
        color="secondary"
        tooltip={t('group:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    setLoadGroup(() => (): void => loadGroup());
  }, []);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language, isSaving, saveCallback]);

  return groupLoading ? (
    <CircularSpinner />
  ) : (
    <GroupForm group={group} header={t('group:headers.edit')} setSaveCallback={setSaveCallback} request={request} />
  );
};

export default compose(withGroupView)(GroupEdit);
