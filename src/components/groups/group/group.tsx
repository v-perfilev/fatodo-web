import React, {FC, memo, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {TEST_GROUP} from '../_constants';
import {setMenu} from '../../../store/actions/additional-menu.actions';
import {connect, ConnectedProps} from 'react-redux';
import {compose} from 'recompose';
import AdditionalMenuSpacer from '../../layout/additional-menu/additional-menu-spacer';
import {useTranslation} from 'react-i18next';

const initGroup = TEST_GROUP;

const mapDispatchToProps = {setMenu};
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Group: FC<Props> = ({setMenu}: Props) => {
  const {i18n} = useTranslation();

  console.log(initGroup);

  const menu = (
    <>
      <AdditionalMenuSpacer />
    </>
  );

  useEffect(() => {
    setMenu(menu);
  }, [i18n.language]);

  return <Box>test</Box>;
};

export default compose(connector, memo)(Group);
