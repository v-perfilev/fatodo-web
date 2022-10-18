import React, {ReactElement, useMemo} from 'react';
import {ItemType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import TaskIcon from '../icons/TaskIcon';
import EventIcon from '../icons/EventIcon';
import RepetitionIcon from '../icons/RepetitionIcon';
import NoteIcon from '../icons/NoteIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {TypographyProps} from '@mui/material';
import TruncatedTypography from '../surfaces/TruncatedTypography';

type TypeViewProps = TypographyProps & {
  type: ItemType;
  withoutText?: boolean;
};

export const TypeView = ({type, fontSize, color, withoutText}: TypeViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (): ReactElement => {
    switch (type) {
      case 'TASK':
        return <TaskIcon />;
      case 'EVENT':
        return <EventIcon />;
      case 'REPETITION':
        return <RepetitionIcon />;
      case 'NOTE':
        return <NoteIcon />;
    }
  };

  const icon = React.cloneElement(getIcon(), {color: 'primary', mt: !withoutText ? 0.5 : undefined});
  const text = useMemo(() => t('common:types.' + type), [type, i18n.language]);

  const onlyIcon = <FCenter>{icon}</FCenter>;
  const iconWithText = (
    <FHStack spacing={1} flexGrow={0}>
      {icon}
      <TruncatedTypography fontSize={fontSize} color={color}>
        {text}
      </TruncatedTypography>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default TypeView;
