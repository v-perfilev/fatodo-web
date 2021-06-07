import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {Box, Button, CardContent, Typography} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {ArrowDownIcon} from '../../common/icons/arrow-down-icon';
import {ArrowUpIcon} from '../../common/icons/arrow-up-icon';
import {useTrail} from 'react-spring';
import GroupCardItem from './group-preview-card-item';
import {ITEMS_IN_GROUP_CARD} from '../_constants';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';

const GroupPreviewCardContent: FC = () => {
  const classes = groupCardContentStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const {objs: items, setObjs: setItems} = useItemListContext();
  const [firstShowedItem, setFirstShowedItem] = useState(0);
  const ref = useRef();

  const isMultiPage = items.length > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShowedItem > 0;
  const isNotLastPage = firstShowedItem + ITEMS_IN_GROUP_CARD < items.length;

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

  const trail = useTrail(itemsToShow.length, {
    reset: true,
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  useEffect(() => {
    loadItems();
  }, []);

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

export default withItemList(GroupPreviewCardContent);
