import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {IconProps} from '../../surfaces';
import {ItemStatusType} from '../../../models/item.model';
import {StatusCreatedIcon} from '../../icons/status-created-icon';
import {StatusWipIcon} from '../../icons/status-wip-icon';
import {StatusCompletedIcon} from '../../icons/status-completed-icon';
import {StatusClosedIcon} from '../../icons/status-closed-icon';

type Props = IconProps & {
  statusType: ItemStatusType;
};

export const StatusView: FC<Props> = ({statusType, className, ...props}: Props) => {
  const iconByStatusType = (statusType: ItemStatusType): ReactElement => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon {...props} />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon {...props} />;
      case 'COMPLETED':
        return <StatusCompletedIcon {...props} />;
      case 'CLOSED':
        return <StatusClosedIcon {...props} />;
      default:
        return <StatusCreatedIcon {...props} />;
    }
  };

  return <Box className={className}>{iconByStatusType(statusType)}</Box>;
};
