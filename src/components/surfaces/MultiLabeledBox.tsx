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

type MultiLabeledBoxLabelProps = Omit<TypographyProps, 'height'> & {
  label: string;
  height: number;
};

type MultiLabeledBoxValueProps = Omit<TypographyProps, 'height'> & {
  value: string | ReactElement;
  showNotSet?: boolean;
  height: number;
};

type MultiLabeledBoxProps = Omit<TypographyProps, 'height'> & {
  items: MultiLabeledBoxItem[];
  height?: number;
};

const MultiLabeledBoxLabel = ({label, height, ...props}: MultiLabeledBoxLabelProps) => {
  return (
    <FBox height={height} alignItems="center">
      <Typography fontSize={14} fontWeight="bold" color="grey.500" {...props}>
        {label}:
      </Typography>
    </FBox>
  );
};

const MultiLabeledBoxValue = ({value, showNotSet, height, ...props}: MultiLabeledBoxValueProps) => {
  const {t} = useTranslation();
  const handledChildren = showNotSet ? value || t('additional.fieldNotSet') : value;

  const valueElement =
    typeof handledChildren === 'string' ? (
      <Typography fontSize={14} color={!value && showNotSet ? 'grey.500' : undefined} {...props}>
        {handledChildren}
      </Typography>
    ) : (
      handledChildren
    );

  return (
    <FBox height={height} alignItems="center">
      {valueElement}
    </FBox>
  );
};

const MultiLabeledBox = ({items, height = 40, ...props}: MultiLabeledBoxProps) => {
  const filteredItems = items.filter((i) => i.value || i.showNotSet);

  return (
    <FHStack flexGrow={0}>
      <FVStack spacing={0} flexGrow={0}>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxLabel label={item.label} height={height} key={index} {...props} />
        ))}
      </FVStack>
      <FVStack spacing={0} flexGrow={0}>
        {filteredItems.map((item, index) => (
          <MultiLabeledBoxValue
            value={item.value}
            height={height}
            showNotSet={item.showNotSet}
            key={index}
            {...props}
          />
        ))}
      </FVStack>
    </FHStack>
  );
};

export default MultiLabeledBox;
