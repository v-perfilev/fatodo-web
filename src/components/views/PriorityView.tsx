import React, {ReactElement, useMemo} from 'react';
import {ItemPriorityType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';
import FHStack from '../boxes/FHStack';
import FCenter from '../boxes/FCenter';
import {TypographyProps} from '@mui/material';
import TruncatedTypography from '../surfaces/TruncatedTypography';

type PriorityViewProps = TypographyProps & {
  priority: number | ItemPriorityType;
  withoutText?: boolean;
  size?: 'large' | 'medium' | 'small';
};

export const PriorityView = ({priority, fontSize, color, size, withoutText}: PriorityViewProps) => {
  const {t, i18n} = useTranslation();
  const getIcon = (priority: number | ItemPriorityType): ReactElement => {
    switch (priority) {
      case 1:
      case 'LOW':
        return <LowPriorityIcon color="disabled" />;
      case 2:
      case 'NORMAL':
        return <NormalPriorityIcon color="primary" />;
      case 3:
      case 'HIGH':
        return <HighPriorityIcon color="error" />;
    }
  };

  const getText = (priority: number | ItemPriorityType): string => {
    switch (priority) {
      case 1:
      case 'LOW':
        return t('common:priorities.low');
      case 2:
      case 'NORMAL':
        return t('common:priorities.normal');
      case 3:
      case 'HIGH':
        return t('common:priorities.high');
    }
  };

  const icon = React.cloneElement(getIcon(priority), {fontSize: size, mt: !withoutText ? 0.5 : undefined});
  const text = useMemo(() => getText(priority), [priority, i18n.language]);

  const onlyIcon = <FCenter>{icon}</FCenter>;

  const iconWithText = (
    <FHStack spacing={1} flexGrow={0}>
      {icon}
      <TruncatedTypography fontSize={fontSize} color={color}>
        {text}
      </TruncatedTypography>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default PriorityView;
