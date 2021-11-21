import * as React from 'react';
import {FC} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

type Props = {
  height: number;
};

const GroupPreviewCard: FC<Props> = ({height}: Props) => {
  const classes = groupCardStyles();
  const {obj: group} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);

  const cardStyle = {height: height};

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card square elevation={3} className={classes.card} style={cardStyle}>
          <GroupPreviewCardHeader />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};

export default GroupPreviewCard;
