import React, {FC, useEffect, useRef} from 'react';
import {itemFormStyles} from './_styles';
import {Item} from '../../../models/item.model';
import {Button, Container, Grid, ThemeProvider} from '@material-ui/core';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import {ItemFormUtils, ItemFormValues} from './_form';
import {ThemeFactory} from '../../../shared/theme/theme';
import {Group} from '../../../models/group.model';
import {ItemDTO} from '../../../models/dto/item.dto';
import {PageHeader} from '../../common/surfaces/page-header';
import {PageDivider} from '../../common/surfaces/page-divider';
import {TextInput} from '../../common/inputs/text-input';
import {useTranslation} from 'react-i18next';
import TypeInput from '../../common/inputs/type-input';
import {PriorityInput} from '../../common/inputs/priority-input';
import {TimeInput} from '../../common/inputs/time-input';
import {DateInput} from '../../common/inputs/date-input';
import {MultilineInput} from '../../common/inputs/multiline-input';
import {RemindersInput} from '../../common/inputs/reminders-input';
import {TagsInput} from '../../common/inputs/tags-input';

type Props = FormikProps<any> & {
  group: Group;
  item?: Item;
  header: string;
  setSaveCallback: (callback: () => () => void) => void;
  request: (data: ItemDTO, stopSubmitting: () => void) => void;
};

const ItemForm: FC<Props> = (props: Props) => {
  const classes = itemFormStyles();
  const {t} = useTranslation();
  const {group, header, setSaveCallback, isValid, submitForm, isSubmitting} = props;
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (isValid) {
      setSaveCallback(() => (): void => buttonRef.current.click());
    } else {
      setSaveCallback(() => (): Promise<void> => submitForm());
    }
  }, [isValid]);

  const theme = group ? ThemeFactory.getTheme(group.color) : ThemeFactory.getDefaultTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <PageHeader title={header} />
        <PageDivider height={5} />
        <Form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput name="title" label={t('items:fields.title.label')} required />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TypeInput name="type" label={t('items:fields.type.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <PriorityInput name="priority" label={t('items:fields.priority.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TimeInput name="time" label={t('items:fields.time.label')} />
            </Grid>
            <Grid item xs={6} lg={3}>
              <DateInput name="date" label={t('items:fields.date.label')} />
            </Grid>
            <Grid item xs={12}>
              <MultilineInput name="description" label={t('items:fields.description.label')} />
            </Grid>
            <Grid item xs={12}>
              <RemindersInput name="reminders" label={t('items:fields.reminders.label')} />
            </Grid>
            <Grid item xs={12}>
              <TagsInput name="tags" label={t('items:fields.tags.label')} />
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
  mapPropsToValues: ({item}: Props) => ItemFormUtils.mapItemToValues(item),

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('items:fields.title.required')),
    type: Yup.string().required(() => i18n.t('items:fields.type.required')),
    priority: Yup.string().required(() => i18n.t('items:fields.priority.required'))
  }),

  validateOnMount: true,

  handleSubmit: (values: ItemFormValues, {setSubmitting, props}: FormikBag<Props, ItemFormValues>) => {
    const {request, item, group} = props;
    const data = ItemFormUtils.mapValuesToDTO(values, item, group);
    request(data, () => setSubmitting(false));
  }
});

export default compose(formik)(ItemForm);
