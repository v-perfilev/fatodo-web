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

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupCreate: FC<Props> = ({setMenu}: Props) => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const [saveCallback, setSaveCallback] = useState<() => void>(() => () => {
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
    setMenu(menu);
  }, [i18n.language, saveCallback]);

  return (
    <GroupForm
      header={t('groups:headers.createGroup')}
      setSaveCallback={setSaveCallback}
      onSucess={redirectToGroupsRoot}
    />
  );
};

export default compose(connector)(GroupCreate);
