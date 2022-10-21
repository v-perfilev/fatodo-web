import React from 'react';
import {useTranslation} from 'react-i18next';
import {Typography, TypographyProps} from '@mui/material';
import FVStack from '../boxes/FVStack';
import FHStack from '../boxes/FHStack';

type LabeledBoxProps = TypographyProps & {
  label: string;
  isVertical?: boolean;
  showNotSet?: boolean;
};

const LabeledBox = ({label, isVertical, showNotSet, children, ...props}: LabeledBoxProps) => {
  const {t} = useTranslation();
  const Wrapper = isVertical ? FVStack : FHStack;
  const handledChildren = showNotSet ? children || t('additional.fieldNotSet') : children;
  const content =
    typeof handledChildren === 'string' ? (
      <Typography {...props} color={!children && showNotSet ? 'gray.500' : undefined}>
        {handledChildren}
      </Typography>
    ) : (
      handledChildren
    );
  const alignItems = isVertical ? null : 'center';

  return (
    <Wrapper flexGrow={0} alignItems={alignItems}>
      <Typography {...props} fontWeight="bold" color="grey.500">
        {label}:
      </Typography>
      {content}
    </Wrapper>
  );
};

export default LabeledBox;
