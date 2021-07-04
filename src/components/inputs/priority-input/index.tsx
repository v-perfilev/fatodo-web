import React, {FC} from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemPriorities} from '../../../models/item.model';
import {MenuItem} from '@material-ui/core';
import {PriorityView} from '../../views/priority-view';

type Props = {
  name: string;
  label: string;
};

export const PriorityInput: FC<Props> = ({name, label}: Props) => {
  return (
    <Field component={TextField} type="text" name={name} label={label} select required fullWidth>
      {Object.values(itemPriorities).map((priority, index) => (
        <MenuItem value={priority} key={index}>
          <PriorityView priority={priority} />
        </MenuItem>
      ))}
    </Field>
  );
};
