import React, {ChangeEvent, FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {contactFilterStyles} from './_styles';
import {ClearableTextInput} from '../../../components/inputs';

type Props = {
  setFilter: (filter: string) => void;
};

const ContactFilter: FC<Props> = ({setFilter}: Props) => {
  const classes = contactFilterStyles();
  const {t} = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} fullWidth />
    </Box>
  );
};

export default ContactFilter;
