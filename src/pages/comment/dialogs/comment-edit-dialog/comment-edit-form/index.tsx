import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {CommentEditFormUtils, CommentEditValues} from './_form';
import {MultilineInput} from '../../../../../components/inputs';
import {FormDialogComponentProps} from '../../../../../components/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import {flowRight} from 'lodash';
import CommentService from '../../../../../services/comment.service';
import {Comment} from '../../../../../models/comment.model';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<CommentEditValues> & SnackState & BaseProps;

const CommentEditForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {setErrors} = props;
  const {isValid, isSubmitting, submitForm, validateForm, resetForm} = props;
  const {t} = useTranslation();

  useEffect(() => {
    setSubmitForm(() => (): void => {
      submitForm().finally();
    });
    setResetForm(() => (): void => {
      resetForm();
      validateForm().then((errors) => setErrors(errors));
    });
  }, []);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  return (
    <Form>
      <MultilineInput name="text" label={t('comment:editComment.fields.text.label')} rows={5} />
    </Form>
  );
};

const formik = withFormik<Props, CommentEditValues>({
  mapPropsToValues: ({params}: Props) => CommentEditFormUtils.mapPropsToValues(params.comment),
  validationSchema: () => CommentEditFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: CommentEditValues, {props, setSubmitting}: FormikBag<Props, CommentEditValues>) => {
    const {params, handleCode, handleResponse} = props;

    const comment = params.comment as Comment;
    const dto = CommentEditFormUtils.mapValuesToDTO(values);

    CommentService.editComment(comment.id, dto)
      .then(() => {
        handleCode('comment.commentEdited', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, formik])(CommentEditForm);
