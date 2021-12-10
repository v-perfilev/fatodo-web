import * as React from 'react';
import {FC, ReactElement, useCallback} from 'react';
import {IconProps} from '../../surfaces';
import {ItemStatusType} from '../../../models/item.model';
import {StatusCreatedIcon} from '../../icons/status-created-icon';
import {StatusWipIcon} from '../../icons/status-wip-icon';
import {StatusCompletedIcon} from '../../icons/status-completed-icon';
import {StatusClosedIcon} from '../../icons/status-closed-icon';
import {Box, Tooltip} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {statusViewStyles} from './_styles';

type Props = IconProps & {
  statusType: ItemStatusType;
};

export const StatusView: FC<Props> = ({statusType}: Props) => {
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
    [statusType, i18n.language]
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
    [statusType]
  );

  return (
    <Tooltip title={textByStatusType(statusType)}>
      <Box className={classes.box}>{iconByStatusType(statusType)}</Box>
    </Tooltip>
  );
};
