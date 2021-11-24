import * as React from 'react';
import {FC, useCallback, useMemo} from 'react';
import {Grid} from '@material-ui/core';
import {groupGridItemStyles} from './_styles';
import {ActivePlaceholder} from '../../../components/surfaces';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {GroupRouteUtils} from '../_router';

type Props = {
  height: number;
  setRef: (element: HTMLDivElement) => void;
};

const GroupPreviewGridCreateButton: FC<Props> = ({height, setRef}: Props) => {
  const classes = groupGridItemStyles();
  const history = useHistory();
  const {t, i18n} = useTranslation();

  const action = useCallback((): void => {
    history.push(GroupRouteUtils.getCreateUrl());
  }, []);

  const text = useMemo<string>(() => t('group:menu.createGroup'), [i18n.language]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <ActivePlaceholder action={action} icon={<PlusIcon />} text={text} height={height} setRef={setRef} />
    </Grid>
  );
};

export default GroupPreviewGridCreateButton;
