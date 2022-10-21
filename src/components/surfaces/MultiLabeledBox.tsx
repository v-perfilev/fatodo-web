import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';
import FBox from '../boxes/FBox';
import {Typography, TypographyProps} from '@mui/material';

export type MultiLabeledBoxItem = {
  label: string;
  value: string | ReactElement;
  showNotSet?: boolean;
};

type MultiLabeledBoxLabelProps = TypographyProps & {
  label: string;
};

type MultiLabeledBoxValueProps = TypographyProps & {
  value: string | ReactElement;
  showNotSet?: boolean;
};

type MultiLabeledBoxProps = TypographyProps & {
  items: MultiLabeledBoxItem[];
};

const MultiLabeledBoxLabel = ({label, ...props}: MultiLabeledBoxLabelProps) => {
  return (
    <FBox>
      <Typography {...props} fontWeight="bold" color="grey.500">
        {label}:
      </Typography>
    </FBox>
  );
};

const MultiLabeledBoxValue = ({value, showNotSet, ...props}: MultiLabeledBoxValueProps) => {
  const {t} = useTranslation();
  const handledChildren = showNotSet ? value || t('additional.fieldNotSet') : value;

  return typeof handledChildren === 'string' ? (
    <Typography {...props} color={!value && showNotSet ? 'grey.500' : undefined}>
      {handledChildren}
    </Typography>
  ) : (
    handledChildren
  );
};

const MultiLabeledBox = ({items, ...props}: MultiLabeledBoxProps) => {
  const filteredItems = items.filter((i) => i.value || i.showNotSet);

  return (
    <FHStack>
      <FVStack flexGrow={0}>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxLabel label={item.label} key={index} {...props} />
        ))}
      </FVStack>
      <FVStack flexGrow={0}>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxValue value={item.value} showNotSet={item.showNotSet} key={index} {...props} />
        ))}
      </FVStack>
    </FHStack>
  );
};

export default MultiLabeledBox;
