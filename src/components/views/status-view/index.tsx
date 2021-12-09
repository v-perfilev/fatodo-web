import * as React from 'react';
import {FC, ReactElement} from 'react';
import {IconProps} from '../../surfaces';
import {ItemStatusType} from '../../../models/item.model';
import {StatusCreatedIcon} from '../../icons/status-created-icon';
import {StatusWipIcon} from '../../icons/status-wip-icon';
import {StatusCompletedIcon} from '../../icons/status-completed-icon';
import {StatusClosedIcon} from '../../icons/status-closed-icon';

type Props = IconProps & {
  statusType: ItemStatusType;
};

export const StatusView: FC<Props> = ({statusType}: Props) => {
  const iconByStatusType = (statusType: ItemStatusType): ReactElement => {
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
  };

  return iconByStatusType(statusType);
};
