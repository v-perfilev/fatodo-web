import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {compose} from 'recompose';
import {Group} from '../../../models/group';

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const GroupEdit: FC<Props> = ({setMenu}: Props) => {
  const {i18n, t} = useTranslation();
  const [group, setGroup] = useState<Group>(null);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return group && <span>TODO group form</span>;
};

export default compose(connector)(GroupEdit);
