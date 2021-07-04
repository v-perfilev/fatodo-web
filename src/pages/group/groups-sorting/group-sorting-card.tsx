import * as React from 'react';
import {FC, memo} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupSortingHeader from './group-sorting-header';
import {groupSortingCardStyles} from './_styles';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  bind: (...any) => void;
};

const GroupSortingCard: FC<Props> = ({bind}: Props) => {
  const classes = groupSortingCardStyles();
  const {obj: group} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card square elevation={3} className={classes.card}>
          <GroupSortingHeader bind={bind} />
        </Card>
      </ThemeProvider>
    )
  );
};

export default memo(GroupSortingCard);
