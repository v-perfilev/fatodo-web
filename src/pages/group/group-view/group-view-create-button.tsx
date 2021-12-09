import * as React from 'react';
import {FC, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {groupViewCreateButtonStyles} from './_styles';
import {ActivePlaceholder} from '../../../components/surfaces';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {ItemRouteUtils} from '../../item/_router';
import {Group} from '../../../models/group.model';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

type Props = {
  group: Group;
};

const GroupViewCreateButton: FC<Props> = ({group}: Props) => {
  const classes = groupViewCreateButtonStyles();
  const history = useHistory();
  const {t, i18n} = useTranslation();

  const action = useCallback((): void => {
    history.push(ItemRouteUtils.getCreateUrl(group.id));
  }, []);

  const text = useMemo<string>(() => t('group:menu.createItem'), [i18n.language]);

  return (
    <Box className={classes.root}>
      <ActivePlaceholder
        className={classes.placeholder}
        action={action}
        icon={<PlusIcon />}
        text={text}
        variant="outlined"
        orientation="horizontal"
        size="sm"
      />
    </Box>
  );
};

export default GroupViewCreateButton;
