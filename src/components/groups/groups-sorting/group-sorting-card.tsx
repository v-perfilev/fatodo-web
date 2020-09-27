import * as React from 'react';
import {FC, memo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupSortingHeader from './group-sorting-header';
import {groupSortingCardStyles} from './_styles';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import {ThemeFactory} from '../../../shared/theme/theme';

type Props = {
  group: Group;
  bind: (...any) => void;
};

const GroupSortingCard: FC<Props> = ({group, bind}: Props) => {
  const classes = groupSortingCardStyles();

  const theme = ThemeFactory.getTheme(group.color);

  return (
    <ThemeProvider theme={theme}>
      <Card square elevation={3} className={classes.card}>
        <GroupSortingHeader group={group} bind={bind} />
      </Card>
    </ThemeProvider>
  );
};

export default compose(memo)(GroupSortingCard);
