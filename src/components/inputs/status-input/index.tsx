import React, {FC, ReactElement, useRef, useState} from 'react';
import {ItemStatusType} from '../../../models/item.model';
import {Box, Button, MenuItem} from '@material-ui/core';
import {StatusCreatedIcon} from '../../icons/status-created-icon';
import {StatusWipIcon} from '../../icons/status-wip-icon';
import {StatusCompletedIcon} from '../../icons/status-completed-icon';
import {StatusClosedIcon} from '../../icons/status-closed-icon';
import {statusInputStyles} from './_styles';
import {PopupMenu} from '../../surfaces';
import {CircularSpinner} from '../../loaders';

type Props = {
  statusType: ItemStatusType;
  setStatusType: (statusType: ItemStatusType) => void;
  loading?: boolean;
};

export const StatusInput: FC<Props> = ({statusType, setStatusType, loading}: Props) => {
  const classes = statusInputStyles();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

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

  const openDialog = (): void => {
    setIsOpen(true);
  };

  const closeDialog = (): void => {
    setIsOpen(false);
  };

  const setStatusToCreated = (): void => {
    if (statusType !== 'CREATED') {
      setStatusType('CREATED');
    }
    closeDialog();
  };

  const setStatusToWip = (): void => {
    if (statusType !== 'WORK_IN_PROGRESS') {
      setStatusType('WORK_IN_PROGRESS');
    }
    closeDialog();
  };

  const setStatusToCompleted = (): void => {
    if (statusType !== 'COMPLETED') {
      setStatusType('COMPLETED');
    }
    closeDialog();
  };

  const setStatusToClosed = (): void => {
    if (statusType !== 'CLOSED') {
      setStatusType('CLOSED');
    }
    closeDialog();
  };

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        startIcon={!loading && iconByStatusType(statusType)}
        ref={ref}
        onClick={openDialog}
      >
        {loading && <CircularSpinner className={classes.spinner} size="xs" />}
      </Button>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={closeDialog}>
        <MenuItem onClick={setStatusToCreated}>
          <StatusCreatedIcon color="primary" />
        </MenuItem>
        <MenuItem onClick={setStatusToWip}>
          <StatusWipIcon color="primary" />
        </MenuItem>
        <MenuItem onClick={setStatusToCompleted}>
          <StatusCompletedIcon color="primary" />
        </MenuItem>
        <MenuItem onClick={setStatusToClosed}>
          <StatusClosedIcon color="primary" />
        </MenuItem>
      </PopupMenu>
    </Box>
  );
};
