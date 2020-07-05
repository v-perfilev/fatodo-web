import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Button, CardContent, Typography} from '@material-ui/core';
import {GroupItem} from '../_types';
import {groupCardContentStyles} from './_styles';
import {ArrowDownIcon} from '../../common/icons/arrow-down-icon';
import {ArrowUpIcon} from '../../common/icons/arrow-up-icon';
import {useTrail} from 'react-spring';
import GroupCardItem from './group-card-item';
import {ITEMS_IN_GROUP_CARD} from '../_constants';

interface Props {
  items: GroupItem[];
}

const GroupCardContent: FC<Props> = ({items}: Props) => {
  const classes = groupCardContentStyles();
  const [initialized, setInitialized] = useState(false);
  const [firstShowedItem, setFirstShowedItem] = useState(0);
  const [itemsToShow, setItemsToShow] = useState([]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    setItemsToShow(items.slice(firstShowedItem, firstShowedItem + ITEMS_IN_GROUP_CARD));
  }, [firstShowedItem]);

  const trail = useTrail(itemsToShow.length, {
    reset: true,
    delay: 50,
    opacity: 1,
    from: initialized && {opacity: 0},
  });

  const isMultiPage = items.length > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShowedItem > 0;
  const isNotLastPage = firstShowedItem + ITEMS_IN_GROUP_CARD < items.length;

  const onUpClick = (): void => setFirstShowedItem(prevState => prevState - ITEMS_IN_GROUP_CARD);
  const onDownClick = (): void => setFirstShowedItem(prevState => prevState + ITEMS_IN_GROUP_CARD);

  return (
    <CardContent className={classes.content}>
      <div className={classes.box}>
        {trail.map((style, index) =>
          <GroupCardItem key={index} item={itemsToShow[index]} style={style} />,
        )}
      </div>
      {isMultiPage && (
        <Box className={classes.control}>
          <Button variant="outlined" size="small" onClick={onUpClick}
                  disabled={!isNotFirstPage}><ArrowUpIcon /></Button>
          <Box className={classes.pageCount}>
            <Typography color="primary">
              {firstShowedItem + 1} - {firstShowedItem + itemsToShow.length} / {items.length}
            </Typography>
          </Box>
          <Button variant="outlined" size="small" onClick={onDownClick}
                  disabled={!isNotLastPage}><ArrowDownIcon /></Button>
        </Box>
      )}
    </CardContent>
  );
};

export default GroupCardContent;
