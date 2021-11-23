import * as React from 'react';
import {FC} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import {flowRight} from 'lodash';

type Props = {
  height: number;
};

const GroupPreviewCard: FC<Props> = ({height}: Props) => {
  const classes = groupCardStyles();
  const style = {height: height};
  const {obj: group} = useGroupViewContext();

  const theme = ThemeFactory.getTheme(group?.color);

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card square elevation={3} className={classes.card} style={style}>
          <GroupPreviewCardHeader />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};

export default flowRight([withItemList])(GroupPreviewCard);
