import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {Card, ThemeProvider} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import GroupPreviewCardBody from './group-preview-card-body';
import {useResize} from '../../../shared/hooks/use-resize';
import {CARD_RATIO} from '../_constants';
import {ThemeFactory} from '../../../shared/theme/theme';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

const GroupPreviewCard: FC = () => {
  const classes = groupCardStyles();
  const sizes = useResize();
  const {group} = useGroupViewContext();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const theme = ThemeFactory.getTheme(group?.color);

  const cardStyle = {height: height};

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setHeight(ref.current.clientWidth * CARD_RATIO);
    }
  }, [sizes, ref]);

  return (
    group && (
      <ThemeProvider theme={theme}>
        <Card square elevation={3} className={classes.card} style={cardStyle} ref={ref}>
          <GroupPreviewCardHeader />
          <GroupPreviewCardBody />
        </Card>
      </ThemeProvider>
    )
  );
};

export default GroupPreviewCard;
