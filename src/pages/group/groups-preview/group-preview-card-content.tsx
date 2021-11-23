import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {Box, Button, CardContent, Typography} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';
import {ArrowUpIcon} from '../../../components/icons/arrow-up-icon';
import {useTrail} from 'react-spring';
import {BUTTONS_IN_GROUP_CARD, ITEMS_IN_GROUP_CARD} from '../_constants';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import GroupPreviewCardItem from './group-preview-card-item';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {CircularSpinner} from '../../../components/loaders';

const GroupPreviewCardContent: FC = () => {
  const classes = groupCardContentStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const {objs: items, setObjs: setItems, setLoad: setLoadItems, loading: itemsLoading} = useItemListContext();
  const [firstShowedItem, setFirstShowedItem] = useState(0);
  const ref = useRef();

  const isMultiPage = items.length + BUTTONS_IN_GROUP_CARD > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShowedItem > 0;
  const isNotLastPage = firstShowedItem + ITEMS_IN_GROUP_CARD < items.length + BUTTONS_IN_GROUP_CARD;

  const itemsToShow = items.slice(firstShowedItem, firstShowedItem + ITEMS_IN_GROUP_CARD);

  const onUpClick = (): void => setFirstShowedItem((prevState) => prevState - ITEMS_IN_GROUP_CARD);
  const onDownClick = (): void => setFirstShowedItem((prevState) => prevState + ITEMS_IN_GROUP_CARD);

  const loadItems = (): void => {
    ItemService.getAllItemsByGroupId(group.id)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const trailItems = isNotLastPage ? itemsToShow.length : itemsToShow.length + BUTTONS_IN_GROUP_CARD;
  const trail = useTrail(trailItems, {
    reset: true,
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  useEffect(() => {
    setLoadItems(() => (): void => loadItems());
  }, []);

  const listElement = (
    <div className={classes.box} ref={ref}>
      {trail.map((style, index) =>
        index < items.length ? (
          <GroupPreviewCardItem item={itemsToShow[index]} key={index} style={style} />
        ) : (
          <GroupPreviewCardCreateButton group={group} style={style} key={index} />
        )
      )}
    </div>
  );

  const paginationElement = (
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
  );

  return (
    <CardContent className={classes.content}>
      {itemsLoading && <CircularSpinner size="sm" />}
      {!itemsLoading && listElement}
      {!itemsLoading && isMultiPage && paginationElement}
    </CardContent>
  );
};

export default GroupPreviewCardContent;
