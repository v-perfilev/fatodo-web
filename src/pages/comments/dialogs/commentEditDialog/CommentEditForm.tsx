import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import i18n from '../../../../shared/i18n';
import {Comment} from '../../../../models/Comment';
import {CommentDTO} from '../../../../models/dto/CommentDTO';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {Button} from '@mui/material';
import LoadingButton from '../../../../components/controls/LoadingButton';

export interface CommentEditFormValues {
  text: string;
}

const initialValues = (comment: Comment): CommentEditFormValues => ({text: comment.text});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('comment:editComment.fields.text.required')),
});

type CommentEditFormProps = {
  comment: Comment;
  request: (dto: CommentDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const CommentEditForm = ({comment, request, cancel}: CommentEditFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: CommentEditFormValues, helpers: FormikHelpers<CommentEditFormValues>) => {
    const dto: MessageDTO = {text: values.text};
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(comment)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput
            name="text"
            label={t('comment:editComment.fields.text.label')}
            disabled={formikProps.isSubmitting}
            rows={4}
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('comment:editComment.cancel')}
            </Button>
            <LoadingButton
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('comment:editComment.send')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default CommentEditForm;
