import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemPriorities} from '../../../models/item.model';
import {MenuItem} from '@material-ui/core';
import PriorityView from '../../common/layout-item/priority-view';

const ItemFormPriority: FC = () => {
  const {t} = useTranslation();

  return (
    <Field
      component={TextField}
      type="text"
      name="priority"
      label={t('items:fields.priority.label')}
      select
      required
      fullWidth
    >
      {Object.values(itemPriorities).map((priority, index) => (
        <MenuItem value={priority} key={index}>
          <PriorityView priority={priority} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default ItemFormPriority;
