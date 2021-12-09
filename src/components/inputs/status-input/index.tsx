import React, {FC, ReactElement} from 'react';
import {ItemStatusType} from '../../../models/item.model';
import {Button} from '@material-ui/core';
import {StatusCreatedIcon} from '../../icons/status-created-icon';
import {StatusWipIcon} from '../../icons/status-wip-icon';
import {StatusCompletedIcon} from '../../icons/status-completed-icon';
import {StatusClosedIcon} from '../../icons/status-closed-icon';

type Props = {
  statusType: ItemStatusType;
  onChange?: (status: ItemStatusType) => void;
};

export const StatusInput: FC<Props> = ({statusType, onChange}: Props) => {
  const iconByStatusType = (statusType: ItemStatusType): ReactElement => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon />;
      case 'COMPLETED':
        return <StatusCompletedIcon />;
      case 'CLOSED':
        return <StatusClosedIcon />;
      default:
        return <StatusCreatedIcon />;
    }
  };

  return (
    <>
      <Button color="primary">{iconByStatusType(statusType)}</Button>
    </>
  );
};
