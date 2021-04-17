import React, {FC, useEffect, useRef} from 'react';
import {itemFormStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Button, Container, Grid, ThemeProvider} from '@material-ui/core';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {ItemFormUtils, ItemFormValues} from './_form';
import {ThemeFactory} from '../../../shared/theme/theme';
import {Group} from '../../../models/group.model';
import {ItemDTO} from '../../../models/dto/item.dto';
import {PageDivider, PageHeader} from '../../common/surfaces';
import {
  DateInput,
  MultilineInput,
  PriorityInput,
  RemindersInput,
  TagsInput,
  TextInput,
  TimeInput,
} from '../../common/inputs';
import {useTranslation} from 'react-i18next';
import TypeInput from '../../common/inputs/type-input';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';

type BaseProps = {
  group: Group;
  item?: Item;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (data: ItemDTO, stopSubmitting: () => void) => void;
};

type Props = FormikProps<ItemFormValues> & BaseProps;

const ItemForm: FC<Props> = (props: Props) => {
  const classes = itemFormStyles();
  const {t} = useTranslation();
  const {group, header, setSaveCallback, isValid, submitForm, isSubmitting} = props;
  const buttonRef = useRef<HTMLButtonElement>();

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  useEffect(() => {
    setSaveCallback(() => (): void | Promise<void> => (isValid ? buttonRef.current.click() : submitForm()));
  }, [isValid]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PageHeader title={header} />
        <PageDivider height={5} />
        <Form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput name="title" label={t('item:fields.title.label')} required />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TypeInput name="type" label={t('item:fields.type.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <PriorityInput name="priority" label={t('item:fields.priority.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TimeInput name="time" label={t('item:fields.time.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <DateInput name="date" label={t('item:fields.date.label')} />
            </Grid>
            <Grid item xs={12}>
              <MultilineInput name="description" label={t('item:fields.description.label')} />
            </Grid>
            <Grid item xs={12}>
              <RemindersInput name="reminders" label={t('item:fields.reminders.label')} />
            </Grid>
            <Grid item xs={12}>
              <TagsInput name="tags" label={t('item:fields.tags.label')} />
            </Grid>
          </Grid>
          <Button type="submit" disabled={!isValid || isSubmitting} ref={buttonRef} className={classes.submitButton}>
            Submit
          </Button>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

const formik = withFormik<Props, ItemFormValues>({
  mapPropsToValues: ({item}: Props) => ItemFormUtils.mapPropsToValues(item),
  validationSchema: ItemFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: ItemFormValues, {setSubmitting, props}: FormikBag<Props, ItemFormValues>) => {
    const {request, item, group} = props;
    const dto = ItemFormUtils.mapValuesToDTO(values, item, group);
    request(dto, () => setSubmitting(false));
  },
});

export default compose<Props, BaseProps>(formik, withVerticalPadding)(ItemForm);
