import React, {ReactElement, useCallback} from 'react';
import {ItemStatusType} from '../../models/item.model';
import {Box, Tooltip} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {IconProps} from '../surfaces/Icon';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';

type StatusViewProps = IconProps & {
  statusType: ItemStatusType;
};

const StatusView = ({statusType}: StatusViewProps) => {
  const classes = statusViewStyles();
  const {t, i18n} = useTranslation();

  const textByStatusType = useCallback(
    (statusType: ItemStatusType): string => {
      switch (statusType) {
        case 'CREATED':
          return t('item:statuses.created');
        case 'WORK_IN_PROGRESS':
          return t('item:statuses.workInProgress');
        case 'COMPLETED':
          return t('item:statuses.completed');
        case 'CLOSED':
          return t('item:statuses.closed');
        default:
          return t('item:statuses.created');
      }
    },
    [statusType, i18n.language],
  );

  const iconByStatusType = useCallback(
    (statusType: ItemStatusType): ReactElement => {
      switch (statusType) {
        case 'CREATED':
          return <StatusCreatedIcon color="primary" />;
        case 'WORK_IN_PROGRESS':
          return <StatusWipIcon color="primary" />;
        case 'COMPLETED':
          return <StatusCompletedIcon color="primary" />;
        case 'CLOSED':
          return <StatusClosedIcon color="primary" />;
        default:
          return <StatusCreatedIcon color="primary" />;
      }
    },
    [statusType],
  );

  return (
    <Tooltip title={textByStatusType(statusType)}>
      <Box className={classes.box}>{iconByStatusType(statusType)}</Box>
    </Tooltip>
  );
};

const statusViewStyles = makeStyles(() => ({
  box: {
    display: 'flex',
  },
}));

export default StatusView;
