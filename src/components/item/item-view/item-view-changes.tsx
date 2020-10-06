import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {Item} from '../../../models/item.model';
import {itemViewChangesStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/layouts/labeled-box';
import {DateFormatters} from '../../../shared/utils/date.utils';
import csx from 'classnames';
import UserService from '../../../services/user.service';
import {User} from '../../../models/user.model';

type Props = HTMLAttributes<any> & {
  item: Item;
};

const ItemViewChanges: FC<Props> = ({item, className}: Props) => {
  const classes = itemViewChangesStyles();
  const {t} = useTranslation();
  const [creator, setCreator] = useState<string>();
  const [updater, setUpdater] = useState<string>();

  const classNames = csx(classes.root, className);

  const getDate = (timestamp: string): string => {
    const timestampNumber = Number(timestamp) * 1000;
    return DateFormatters.formatTime(new Date(timestampNumber))
      + ' ' + DateFormatters.formatDateWithYear(new Date(timestampNumber));
  };

  const loadUsernames = (): void => {
    UserService.getAllByIds([item.createdBy, item.lastModifiedBy].filter(id => id != null))
      .then((response) => {
        const users: User[] = response.data;
        if (item.createdBy) {
          const username = users.length > 0
            ? users[0].username
            : item.createdBy;
          setCreator(username);
        }
        if (item.lastModifiedBy) {
          const username = users.length > 1
            ? users[1].username
            : users.length > 0
              ? users[0].username
              : item.createdBy;
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
        <>
          <LabeledBox label={t('items:labels.createdBy')}>
            <Box>{creator}</Box>
          </LabeledBox>
          <LabeledBox label={t('items:labels.createdAt')}>
            <Box>{getDate(item.createdAt)}</Box>
          </LabeledBox>
        </>
      )}
      {(updater && item.createdAt !== item.lastModifiedAt) && (
        <>
          <LabeledBox label={t('items:labels.updatedBy')}>
            <Box>{updater}</Box>
          </LabeledBox>
          <LabeledBox label={t('items:labels.updatedAt')}>
            <Box>{getDate(item.lastModifiedAt)}</Box>
          </LabeledBox>
        </>
      )}
    </Box>
  );
};

export default ItemViewChanges;
