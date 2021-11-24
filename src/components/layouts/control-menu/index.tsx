import * as React from 'react';
import {FC} from 'react';
import {controlMenuStyles} from './_styles';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {Box} from '@material-ui/core';
import {LoadingButton} from '../../controls';
import csx from 'classnames';

type Props = {
  menu: MenuElement[];
  disabled?: boolean;
  floatRight?: boolean;
};

const ControlMenu: FC<Props> = ({menu, disabled, floatRight}: Props) => {
  const classes = controlMenuStyles();
  const classNames = csx(classes.root, {[classes.floatRight]: floatRight});

  return (
    <Box className={classNames}>
      {menu
        .filter((action) => !action.hidden && !action.hiddenInControlMenu)
        .map((action, index) => (
          <LoadingButton
            key={index}
            startIcon={action.icon}
            onClick={action.action}
            disabled={disabled || action.disabled}
            loading={action.loading}
            color={action.color || 'primary'}
            variant="contained"
            size="small"
          >
            {action.text}
          </LoadingButton>
        ))}
    </Box>
  );
};

export default ControlMenu;
