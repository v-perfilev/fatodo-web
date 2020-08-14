import * as React from 'react';
import {FC, memo, useEffect, useRef, useState} from 'react';
import {Box, Button, CardContent, Typography} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {ArrowDownIcon} from '../../common/icons/arrow-down-icon';
import {ArrowUpIcon} from '../../common/icons/arrow-up-icon';
import {useTrail} from 'react-spring';
import GroupCardItem from './group-preview-card-item';
import {ITEMS_IN_GROUP_CARD} from '../_constants';
import {compose} from 'recompose';
import {Item} from '../../../models/item';

type Props = {
  items: Item[];
};

const GroupPreviewCardContent: FC<Props> = ({items}: Props) => {
  const classes = groupCardContentStyles();

  const ref = useRef();
  const [initialized, setInitialized] = useState(false);
  const [firstShowedItem, setFirstShowedItem] = useState(0);
  const [itemsToShow, setItemsToShow] = useState<Item[]>([]);

  const isMultiPage = items.length > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShowedItem > 0;
  const isNotLastPage = firstShowedItem + ITEMS_IN_GROUP_CARD < items.length;

  const onUpClick = (): void => setFirstShowedItem((prevState) => prevState - ITEMS_IN_GROUP_CARD);
  const onDownClick = (): void => setFirstShowedItem((prevState) => prevState + ITEMS_IN_GROUP_CARD);

  useEffect(() => {
    setTimeout(() => setInitialized(true), 500);
  }, []);

  useEffect(() => {
    setItemsToShow(items.slice(firstShowedItem, firstShowedItem + ITEMS_IN_GROUP_CARD));
  }, [firstShowedItem]);

  const trail = useTrail(
    itemsToShow.length,
    initialized && {
      reset: true,
      delay: 50,
      opacity: 1,
      from: {opacity: 0},
    },
  );

  return (
    <CardContent className={classes.content}>
      <div className={classes.box} ref={ref}>
        {trail.map((style, index) => (
          <GroupCardItem item={itemsToShow[index]} key={index} style={style} />
        ))}
      </div>
      {isMultiPage && (
        <Box className={classes.control}>
          <Button variant="outlined" size="small" onClick={onUpClick} disabled={!isNotFirstPage}>
            <ArrowUpIcon />
          </Button>
          <Box className={classes.pageCount}>
            <Typography color="primary">
              {Math.floor(firstShowedItem / ITEMS_IN_GROUP_CARD) + 1}/{Math.ceil(items.length / ITEMS_IN_GROUP_CARD)}
            </Typography>
          </Box>
          <Button variant="outlined" size="small" onClick={onDownClick} disabled={!isNotLastPage}>
            <ArrowDownIcon />
          </Button>
        </Box>
      )}
    </CardContent>
  );
};

export default compose(memo)(GroupPreviewCardContent);
