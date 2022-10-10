import React, {FC, ReactElement, useCallback, useRef, useState} from 'react';
import {ItemStatusType} from '../../../models/item.model';
import {Box, Button, MenuItem, Tooltip} from '@material-ui/core';
import {StatusCreatedIcon} from '../../icons/StatusCreatedIcon';
import {StatusWipIcon} from '../../icons/StatusWipIcon';
import {StatusCompletedIcon} from '../../icons/StatusCompletedIcon';
import {StatusClosedIcon} from '../../icons/StatusClosedIcon';
import {statusInputStyles} from './_styles';
import {PopupMenu} from '../../surfaces';
import {CircularSpinner} from '../../loaders';
import {useTranslation} from 'react-i18next';

type Props = {
  statusType: ItemStatusType;
  setStatusType: (statusType: ItemStatusType) => void;
  loading?: boolean;
};

export const StatusSelect: FC<Props> = ({statusType, setStatusType, loading}: Props) => {
  const classes = statusInputStyles();
  const {t, i18n} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

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
    [statusType, loading, i18n.language],
  );

  const iconByStatusType = useCallback(
    (statusType: ItemStatusType): ReactElement => {
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
    },
    [statusType, loading],
  );

  const openDialog = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeDialog = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const setStatusToCreated = (e: React.MouseEvent<HTMLElement>): void => {
    if (statusType !== 'CREATED') {
      setStatusType('CREATED');
    }
    closeDialog(e);
  };

  const setStatusToWip = (e: React.MouseEvent<HTMLElement>): void => {
    if (statusType !== 'WORK_IN_PROGRESS') {
      setStatusType('WORK_IN_PROGRESS');
    }
    closeDialog(e);
  };

  const setStatusToCompleted = (e: React.MouseEvent<HTMLElement>): void => {
    if (statusType !== 'COMPLETED') {
      setStatusType('COMPLETED');
    }
    closeDialog(e);
  };

  const setStatusToClosed = (e: React.MouseEvent<HTMLElement>): void => {
    if (statusType !== 'CLOSED') {
      setStatusType('CLOSED');
    }
    closeDialog(e);
  };

  return (
    <Box className={classes.root}>
      <Tooltip title={textByStatusType(statusType)}>
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
      </Tooltip>
      <PopupMenu className={classes.popupMenu} anchorEl={ref?.current} open={isOpen} onClose={closeDialog}>
        <Tooltip title={textByStatusType('CREATED')}>
          <MenuItem onClick={setStatusToCreated}>
            <StatusCreatedIcon color="primary" />
          </MenuItem>
        </Tooltip>
        <Tooltip title={textByStatusType('WORK_IN_PROGRESS')}>
          <MenuItem onClick={setStatusToWip}>
            <StatusWipIcon color="primary" />
          </MenuItem>
        </Tooltip>
        <Tooltip title={textByStatusType('COMPLETED')}>
          <MenuItem onClick={setStatusToCompleted}>
            <StatusCompletedIcon color="primary" />
          </MenuItem>
        </Tooltip>
        <Tooltip title={textByStatusType('CLOSED')}>
          <MenuItem onClick={setStatusToClosed}>
            <StatusClosedIcon color="primary" />
          </MenuItem>
        </Tooltip>
      </PopupMenu>
    </Box>
  );
};
