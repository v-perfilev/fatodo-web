import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { itemViewChangesStyles, itemViewCommonStyles } from './_styles';
import { useTranslation } from 'react-i18next';
import { LabeledBox } from '../../common/surfaces/labeled-box';
import { DateFormatters } from '../../../shared/utils/date.utils';
import csx from 'classnames';
import UserService from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { useItemViewContext } from '../../../shared/contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewChanges: FC<Props> = ({ className }: Props) => {
  const classes = itemViewChangesStyles();
  const commonClasses = itemViewCommonStyles();
  const { t } = useTranslation();
  const { item } = useItemViewContext();
  const [creator, setCreator] = useState<string>();
  const [updater, setUpdater] = useState<string>();

  const classNames = csx(classes.root, className);

  const getDate = (timestamp: string): string => {
    const timestampNumber = Number(timestamp) * 1000;
    return (
      DateFormatters.formatTime(new Date(timestampNumber)) +
      ' ' +
      DateFormatters.formatDateWithYear(new Date(timestampNumber))
    );
  };

  const loadUsernames = (): void => {
    UserService.getAllByIds([item.createdBy, item.lastModifiedBy].filter((id) => id != null))
      .then((response) => {
        const users: User[] = response.data;
        if (item.createdBy) {
          const username = users.length > 0 ? users[0].username : item.createdBy;
          setCreator(username);
        }
        if (item.lastModifiedBy) {
          const username = users.length > 1 ? users[1].username : users.length > 0 ? users[0].username : item.createdBy;
          setUpdater(username);
        }
      })
      .catch(() => {
        if (item.createdBy) {
          setCreator(item.createdBy);
        }
        if (item.lastModifiedBy) {
          setUpdater(item.lastModifiedBy);
        }
      });
  };

  useEffect(() => {
    loadUsernames();
  }, []);

  return (
    <Box className={classNames}>
      {creator && (
        <Box className={classes.box}>
          <LabeledBox label={t('items:labels.createdBy')} className={commonClasses.box}>
            <Box>{creator}</Box>
          </LabeledBox>
          <LabeledBox label={t('items:labels.createdAt')} className={commonClasses.box}>
            <Box>{getDate(item.createdAt)}</Box>
          </LabeledBox>
        </Box>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <Box className={classes.box}>
          <LabeledBox label={t('items:labels.updatedBy')} className={commonClasses.box}>
            <Box>{updater}</Box>
          </LabeledBox>
          <LabeledBox label={t('items:labels.updatedAt')} className={commonClasses.box}>
            <Box>{getDate(item.lastModifiedAt)}</Box>
          </LabeledBox>
        </Box>
      )}
    </Box>
  );
};

export default ItemViewChanges;
