import * as React from 'react';
import {FC, memo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupsSortingCardHeader from './groups-sorting-card-header';
import {groupsSortingCardStyles} from './_styles';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  bind: (...any) => void;
};

const GroupsSortingCard: FC<Props> = ({bind}: Props) => {
  const classes = groupsSortingCardStyles();
  const {group} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card elevation={3} className={classes.card}>
          <GroupsSortingCardHeader bind={bind} />
        </Card>
      </ThemeProvider>
    )
  );
};

export default memo(GroupsSortingCard);
