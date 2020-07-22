import * as React from 'react';
import {FC} from 'react';
import {Box, Drawer} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import Logo from '../../common/logo';
import {RootState} from '../../../store';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import {AdditionalMenuState} from '../../../store/rerducers/additional-menu.reducer';
import {compose} from 'recompose';

export const AdditionalMenuSpacer: FC = () => {
  const style = {flexGrow: 1};
  return <Box style={style} />;
};

const mapStateToProps = (state: RootState): AdditionalMenuState => state.additionalMenuState;
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & RouteProps & {
  bottom?: boolean;
};

const AdditionalMenu: FC<Props> = ({bottom, menu}: Props) => {
  const classes = additionalMenuStyles();

  return (
    <Drawer
      variant="permanent"
      anchor={bottom ? 'bottom' : 'left'}
      className={classes.drawer}
      classes={{paper: classes.drawer}}
    >
      {!bottom && (
        <Box className={classes.logo}>
          <Logo />
        </Box>
      )}
      <Box className={classes.container}>{menu}</Box>
    </Drawer>
  );
};

export default compose(connector)(AdditionalMenu);
