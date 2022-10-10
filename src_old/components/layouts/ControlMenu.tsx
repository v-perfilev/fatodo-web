import React, {useMemo} from 'react';
import {MenuElement} from '../../shared/contexts/menu-contexts/types';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles, Theme} from '@material-ui/core/styles';
import LoadingButton from '../controls/LoadingButton';

type ControlMenuProps = {
  menu: MenuElement[];
  disabled?: boolean;
  floatRight?: boolean;
};

const ControlMenu = ({menu, disabled, floatRight}: ControlMenuProps) => {
  const classes = controlMenuStyles();
  const classNames = csx(classes.root, {[classes.floatRight]: floatRight});

  const filteredMenu = useMemo<MenuElement[]>(() => {
    return menu?.filter((action) => !action.hidden && !action.hiddenInControlMenu);
  }, [menu]);

  return (
    <Box className={classNames}>
      {filteredMenu?.map((action, index) => (
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

const controlMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  floatRight: {
    justifyContent: 'flex-end',
  },
}));

export default ControlMenu;
