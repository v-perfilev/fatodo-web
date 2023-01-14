import React, {ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import FHStack from '../boxes/FHStack';
import TruncatedTypography from '../surfaces/TruncatedTypography';
import CheckboxInput from '../controls/CheckboxInput';
import {TypographyProps} from '@mui/material';

type StatusViewProps = TypographyProps & {
  done: boolean;
};

export const StatusView = ({done, fontSize, color}: StatusViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (done: boolean): ReactElement => {
    return <CheckboxInput isSelected={done} />;
  };

  const getText = (done: boolean): string => {
    switch (done) {
      case false:
        return t('common:statuses.workInProgress');
      case true:
        return t('common:statuses.closed');
    }
  };

  const icon = React.cloneElement(getIcon(done));
  const text = useMemo(() => getText(done), [done, i18n.language]);

  return (
    <FHStack spacing={2} alignItems="center">
      {icon}
      <TruncatedTypography fontSize={fontSize} color={color}>
        {text}
      </TruncatedTypography>
    </FHStack>
  );
};

export default StatusView;
