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
      <Typography fontSize={14} color={!children && showNotSet ? 'gray.500' : undefined} {...props}>
        {handledChildren}
      </Typography>
    ) : (
      handledChildren
    );
  const alignItems = isVertical ? null : 'center';

  return (
    <Wrapper flexGrow={0} alignItems={alignItems}>
      <Typography fontSize={14} fontWeight={500} color="grey.500" {...props}>
        {label}:
      </Typography>
      {content}
    </Wrapper>
  );
};

export default LabeledBox;
