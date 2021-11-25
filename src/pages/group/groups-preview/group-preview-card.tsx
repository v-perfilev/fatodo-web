import * as React from 'react';
import {FC, memo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {flowRight} from 'lodash';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';

type Props = AuthState & {
  height: number;
};

const GroupPreviewCard: FC<Props> = ({account, height}: Props) => {
  const classes = groupCardStyles();
  const {obj: group} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);
  const style = {height: height};

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card elevation={3} className={classes.card} style={style}>
          <GroupPreviewCardHeader account={account} />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};
export default flowRight([withAuthState, memo])(GroupPreviewCard);
