import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import GroupForm from '../group-form';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../router';
import AdditionalMenuButton from '../../layout/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {TEST_GROUP} from '../../_constants';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupEdit: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const [group, setGroup] = useState<Group>(null);
  const [saveCallback, setSaveCallback] = useState(() => () => {
  });

  const submit = (): void => saveCallback();

  const redirectToGroupsRoot = (): void => history.push(Routes.GROUPS);

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
        action={redirectToGroupsRoot}
        color="secondary"
        tooltip={t('groups:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    // TODO load group
    setGroup(TEST_GROUP);
  }, []);

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return group && (
    <GroupForm
      group={group}
      header={t('groups:headers.editGroup')}
      setSaveCallback={setSaveCallback}
      onSuccess={redirectToGroupsRoot}
    />
  );
};

export default compose(connector)(GroupEdit);
