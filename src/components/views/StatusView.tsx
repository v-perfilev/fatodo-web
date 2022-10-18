import React, {ReactElement, useMemo} from 'react';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {useTranslation} from 'react-i18next';
import {TypographyProps} from '@mui/material';
import TruncatedTypography from '../surfaces/TruncatedTypography';

type StatusViewProps = TypographyProps & {
  statusType: ItemStatusType;
  withoutText?: boolean;
};

const StatusView = ({statusType, fontSize, color, withoutText}: StatusViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (): ReactElement => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon />;
      case 'COMPLETED':
        return <StatusCompletedIcon />;
      case 'CLOSED':
        return <StatusClosedIcon />;
    }
  };

  const icon = React.cloneElement(getIcon(), {color: 'primary', mt: !withoutText ? 0.5 : undefined});
  const text = useMemo(() => t('common:statuses.' + statusType), [statusType, i18n.language]);

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

export default StatusView;
