import * as React from 'react';
import {FC, useCallback, useMemo} from 'react';
import {Grid} from '@material-ui/core';
import {groupsPreviewGridCreateButtonStyles} from './_styles';
import {ActivePlaceholder} from '../../../components/surfaces';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {GroupRouteUtils} from '../_router';

const GroupsPreviewGridCreateButton: FC = () => {
  const classes = groupsPreviewGridCreateButtonStyles();
  const history = useHistory();
  const {t, i18n} = useTranslation();

  const action = useCallback((): void => {
    history.push(GroupRouteUtils.getCreateUrl());
  }, []);

  const text = useMemo<string>(() => t('group:menu.createGroup'), [i18n.language]);

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} className={classes.item}>
      <ActivePlaceholder className={classes.card} action={action} icon={<PlusIcon />} text={text} />
    </Grid>
  );
};

export default GroupsPreviewGridCreateButton;
