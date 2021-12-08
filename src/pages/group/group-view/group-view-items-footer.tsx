import * as React from 'react';
import {FC, useMemo} from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import {ArrowUpIcon} from '../../../components/icons/arrow-up-icon';
import {ArrowDownIcon} from '../../../components/icons/arrow-down-icon';
import {groupViewItemsFooterStyles} from './_styles';

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const GroupViewItemsFooter: FC<Props> = ({page, setPage, totalPages}: Props) => {
  const classes = groupViewItemsFooterStyles();

  const isMultiPage = useMemo<boolean>(() => totalPages > 1, [totalPages]);

  const onUpClick = (): void => {
    setPage(page - 1);
  };

  const onDownClick = (): void => {
    setPage(page + 1);
  };
  const paginationElement = (
    <Box className={classes.control}>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onUpClick}
        disabled={page == 0}
      >
        <ArrowUpIcon />
      </Button>
      <Box className={classes.pageCount}>
        <Typography color="primary">
          {page} / {totalPages}
        </Typography>
      </Box>
      <Button
        className={classes.paginationButton}
        variant="outlined"
        size="small"
        onClick={onDownClick}
        disabled={page == totalPages - 1}
      >
        <ArrowDownIcon />
      </Button>
    </Box>
  );

  return isMultiPage ? paginationElement : null;
};

export default GroupViewItemsFooter;
