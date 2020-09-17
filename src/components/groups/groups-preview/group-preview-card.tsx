import * as React from 'react';
import {FC, memo, useEffect, useRef, useState} from 'react';
import {Card} from '@material-ui/core';
import GroupPreviewCardHeader from './group-preview-card-header';
import {groupCardStyles} from './_styles';
import {GroupProps} from '../_types';
import GroupPreviewCardBody from './group-preview-card-body';
import {useResize} from '../../../shared/hooks/use-resize';
import {CARD_RATIO} from '../_constants';
import {compose} from 'recompose';

type Props = GroupProps;

const GroupPreviewCard: FC<Props> = ({group}: Props) => {
  const classes = groupCardStyles();

  const sizes = useResize();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientWidth * CARD_RATIO);
  }, [sizes, ref]);

  const cardStyle = {height: height};

  return (
    <Card square elevation={3} className={classes.card} style={cardStyle} ref={ref}>
      <GroupPreviewCardHeader group={group} />
      <GroupPreviewCardBody group={group} />
    </Card>
  );
};

export default compose(memo)(GroupPreviewCard);
